import axios from 'axios';
export async function getSick() {
  const cachedData = localStorage.getItem('sickData');
  if (cachedData) {
    const { data, expireTime } = JSON.parse(cachedData);
    if (expireTime > Date.now()) {
      console.log('cashing');
      return data;
    }
  }
  try {
    const response = await axios.get('http://localhost:4000/sick');
    console.info('calling api');
    const expireTime = Date.now() + 3600000;
    localStorage.setItem(
      'sickData',
      JSON.stringify({ data: response.data, expireTime })
    );
    return response.data;
  } catch (error) {
    console.log('error', error);

    throw error;
  }
}
