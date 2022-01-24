import axios from 'axios';
import qs from 'qs';

function getData() {
  return axios({
    url: '/api/test/test',
    method: 'post',
    data: qs.stringify({
      year: 2020
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    return res.data
  })
}

export {
  getData
}