import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';
class SessionService {
  constructor() {
    this.tenant = '';
    this.role = '';
    this.currentUser;
  }
  setTenant(tenant) {
    this.tenant = tenant;
  }
  getCurrentUser() {
    this.currentUser = TokenServices.getToken();
    return this.currentUser;
  }
  async getTokenInformation() {
    const url = config.baseUrl + '/api/tokens/informations';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + TokenServices.getToken().token,
    };
    const res = await HttpService.get(url, {headers: headers});
    if (res.status === 200) {
      const body = res;
      return body;
    } else if (res.status === 401) {
      console.log('error');
    }
  }
  getTenant() {
    return this.tenant;
  }
  async logIn(domain, password) {
    const data = {
      username: domain,
      password: password,
    };

    const url = config.baseUrl + '/api/auth/login/mobile';
    const res = await HttpService.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/vnd.api+json',
        'x-tenant': this.getTenant(),
      },
    });
    return res;
  }
}
export default new SessionService();
