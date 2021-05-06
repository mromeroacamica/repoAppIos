import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';

class PinConfigServices {
  constructor() {
    this.currentUser = '';
    this.hasValidElectronicCertificate = false;
  }
  getCurrentUser() {
    this.currentUser = TokenServices.getToken();
    return this.currentUser;
  }
  canActivate() {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser == null) {
      return false;
    }
    this.hasValidElectronicCertificate = this.currentUser.account.hasValidElectronicCertificate;
    if (this.hasValidElectronicCertificate) {
      return true;
    } else {
      return false;
    }
  }
}
export default new PinConfigServices();
