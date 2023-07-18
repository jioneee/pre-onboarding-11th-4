import axios from 'axios';
export async function getSick() {
  try {
    const response = await axios.get('http://localhost:4000/sick');

    return response.data;
  } catch (error) {
    console.log('error', error);

    throw error;
  }
}
