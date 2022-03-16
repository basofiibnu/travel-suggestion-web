import axios from 'axios';

export const getPlacesData = async (type, ne, sw) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key':
          'd5dce97f06mshe25723e1fc25a06p1b5a71jsnb2b17703f726',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
