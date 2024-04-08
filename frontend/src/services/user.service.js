import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8180/';

class UserService {

  sendHTTP(method, url, data) {
    let token = localStorage.getItem("user");
    let token1 = JSON.parse(token);
    return axios.request({
      method: method,
      url: API_URL + url,
      data: data,
      headers: {
        "Authorization": "Bearer " + token1.token
      }
    }).then(res => 
      res.data);
  }
}

export default new UserService();
