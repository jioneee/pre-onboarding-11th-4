import axios from 'axios';
export function getSick() {
  axios({
    method: 'get',
    url: 'http://localhost:4000/sick'
  })
    .then(function (res) {
      console.log('res', res.data);
    })
    .catch(function (error) {
      console.log('error', error);
    });
}
