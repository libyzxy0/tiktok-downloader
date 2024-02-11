import axios from 'axios';

/*
* @params {string} - url
* @example 
* // getVideoInfo('https://vt.tiktok.com/...')
* @returns {object} 
*/

const getVideoInfo = async (url) => {
  try {
    const response = await axios.get(`https://tikwm.com/api/?url=${url}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: true };
  }
};

export { getVideoInfo };
