import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8180/';

class UserService {

  sendHTTP(method, url, data) {
    let token = localStorage.getItem("user");
    var headersval = {}
    if(token != null) {
      let token1 = JSON.parse(token);
      headersval.Authorization = "Bearer " + token1.token;
    }
    return axios.request({
      method: method,
      url: API_URL + url,
      data: data,
      headers: headersval
    }).then(res => 
      res.data);
  }
}

export default new UserService();
