import config from '../../config/env/environment';
import TokenServices from '../token/TokenServices';
import HttpService from '../http/HttpService';
import SessionService from '../session/SessionService';

class AccountServices {
  constructor() {}
  public getAccountPhotoURL(
    accountId: string,
    size: 256 | 128 | 64 | 32 = 64,
  ): string {
    return (
      config.baseUrl +
      `/api/custom/accounts/${accountId}/profile-pictures?size=${size}` +
      `&token=${TokenServices.getToken().token}&t=${new Date().getTime()}`
    );
  }
  public async forgotPassword(userName: string) {
    const url = config.baseUrl + '/api/auth/forgot-password/';
    const headers = {
      'x-tenant': SessionService.getTenant(),
    };
    const body = {username: userName};
    const res = await HttpService.post(url, body, {headers: headers});
    return res;
  }
  public async updatePIN(accountId: string, password: string, pin: string) {
    const url =
      config.baseUrl +
      `/api/custom/accounts/${accountId}/electronic-certificates`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };

    const body = {password, pin};
    const res = await HttpService.post(url, body, {headers: headers});
    return res;
  }
  async getAllGenders() {
    const url = config.baseUrl + '/api/genders/';
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const res: any = await HttpService.get(url, {headers: headers});
    return res;
  }
  async getAccount(id: string) {
    const url = config.baseUrl + '/api/accounts/' + id;

    const params = {
      fields:
        'firstName,lastName,birthdate,phone,gender,legajo,email,alternativeEmail,' +
        'cuilCuit,roles,orgUnit,managedOrgUnits,registrationDate,employeeSince,profilePictureFileName,hasValidElectronicCertificate',
    };

    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const res: any = await HttpService.get(url, {
      headers: headers,
      params: params,
    });
    return res;
  }
  async updatePassword(oldPassword: string, newPassword: string) {
    const url = config.baseUrl + '/api/change-password';
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const body = {oldPassword, newPassword};
    const res = await HttpService.post(url, body, {headers: headers});
    console.log('esto es res', res);
    if (res.status === 200) {
      return res;
    } else {
      return res;
    }
  }
  async updateMyAccount(
    accountId: string,
    modifiedAttributes: object,
    genderId?: string,
  ) {
    const url = config.baseUrl + '/api/accounts/' + accountId;
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const body: any = {
      data: {
        type: 'accounts',
        id: accountId,
        attributes: modifiedAttributes,
      },
    };
    if (genderId) {
      body.data.relationships = {
        gender: {
          data: {
            id: genderId,
            type: 'genders',
          },
        },
      };
    }
    const res = await HttpService.patch(url, body, {headers: headers});
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  }
}
export default new AccountServices();
