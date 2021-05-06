import {Utils} from '../../Shared/Utils';
import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import SessionService from '../session/SessionService';
import TokenServices from '../token/TokenServices';
// import {Utils} from '../../Shared/Utils';

class ProcedureServices {
  constructor() {}
  public async getTotalProceduresCount() {
    const currentUser = SessionService.getCurrentUser();
    const roleId = currentUser.account.currentRole.id;
    const url = config.baseUrl + `/api/documents-total?roleId=${roleId}`;
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    const res = await HttpService.get(url, {headers: headers});
    if (res.status == 200) {
      return res;
    }
    return res;
  }
  public getImageUrl(documentId: string, disableCache = false) {
    const token = TokenServices.getToken();
    let url =
      config.baseUrl +
      `/api/document-downloads/${documentId}/images?token=${token.token}`;
    if (disableCache === true) {
      url += '&a=' + new Date().getTime();
    }
    const uriEncode = encodeURI(url);
    return uriEncode;
  }

  async getPropertyOfProcessDefinition(processDefinitionId: string) {
    const currentUser = SessionService.getCurrentUser();
    const url =
      config.baseUrl +
      '/api/process-definitions/' +
      processDefinitionId +
      '/properties?include=values';
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
      'Content-Type': 'application/json',
    };
    const res = await HttpService.get(url, {headers: headers});
    if (res == null) {
      return;
    }
    if (res.status === 200) {
      return res;
    } else {
      return res;
    }
  }

  public async getProcedures(
    filters = '',
    limit = 10,
    currentPage = 0,
    sort = '',
  ) {
    const response: any = [];

    let url = config.baseUrl + `/api/documents?include=documentType`;
    url += `&page[offset]=${currentPage}`;
    if (limit != 0) {
      url += `&page[limit]=${limit}`;
    }
    url += filters;
    const currentUser = SessionService.getCurrentUser();
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    const res = await HttpService.get(url, {headers: headers});
    let body;
    // PROCESANDO LA RESPUESTA - ARMADO LOS REPORTES
    if (res != null && res.status == 200) {
      body = res.data;
      for (const procedureItem of body.data) {
        const objectFound2: any = Utils.searchObjInArray(
          res.data.included,
          'id',
          procedureItem.relationships.documentType.data.id,
        ).obj;
        procedureItem.processDefinitionIdentificator =
          objectFound2.relationships.processDefinition.data.id;
        procedureItem.processDefinitionName = objectFound2.attributes.name;
        procedureItem.disabled = true;
      }
      return res.data.data;
    } else {
      return {
        data: response,
        total: response.length,
        error: res.status,
      };
    }
  }
}
export default new ProcedureServices();
