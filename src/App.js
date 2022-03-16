import React, { Fragment, useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  useEffect(() => {
    let boundsOption = [];
    if (!bounds) {
      boundsOption = {
        ne: { lat: -7.8703255712242, lng: 112.57165438536379 },
        sw: { lat: -7.918870402933706, lng: 112.52419001463625 },
      };
    } else {
      boundsOption = bounds;
    }
    getPlacesData(boundsOption.ne, boundsOption.sw).then((data) => {
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
