import config from '../../config/env/environment';
import HttpService from '../http/HttpService';

class TenantService {
  constructor() {}
  async getTenants(username) {
    const url =
      config.baseUrl +
      '/api/custom/tenant-accounts?username=' +
      encodeURIComponent(username);

    const headers = {headers: {'x-tenant': 'signbox'}};
    const res = await HttpService.get(url, headers);
    if (res.status === 200) {
      return res.data;
    }
    return false;
  }
}
export default new TenantService();
