import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';
import SessionService from '../session/SessionService';
import RNFetchBlob from 'rn-fetch-blob';
import * as forge from '../../lib/forge';

class SignServices {
  constructor() {}
  public async endSign(
    documentId: string,
    hashSigned: string,
    tokenHash: string,
  ) {
    const token = await TokenServices.getToken().token;
    const url =
      config.baseUrl +
      `/api/custom/documents/${documentId}/deferred-signatures`;
    const body = {
      hash: hashSigned,
      token: tokenHash,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await HttpService.put(url, body, {headers});
    return res.status == 200;
  }

  async getDocumentHash(
    documentId: string,
    certificatePem: any,
    conformity: boolean,
    propertyId?: string,
    reason?: any,
    reasonDescription?: string,
    signatureSize?: string,
    digestAlgorithm?: string,
  ) {
    const token = await TokenServices.getToken().token;
    const url =
      config.baseUrl +
      `/api/custom/documents/${documentId}/deferred-signatures`;
    const formData: any = [
      {
        name: 'cert',
        filename: 'cert',
        data: forge.util.encode64(certificatePem),
      },
      {name: 'conformity', data: conformity},
    ];
    if (propertyId) {
      formData.push({name: 'propertyId', data: propertyId});
      formData.push({name: 'reason', data: reason.id});
      formData.push({name: 'reasonDescription', data: reasonDescription});
    }
    formData.push({name: 'signatureSize', data: signatureSize});
    formData.push({name: 'digestAlgorithm', data: digestAlgorithm});

    try {
      const res = await RNFetchBlob.fetch(
        'POST',
        url,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        formData,
      );

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCertFile() {
    const token = await TokenServices.getToken().token;
    const account = SessionService.getCurrentUser();
    const accountId = account.account.id;
    const url =
      config.baseUrl +
      `/api/custom/accounts/${accountId}/electronic-certificates/p12`;
    const res = await RNFetchBlob.fetch('GET', url, {
      Authorization: `Bearer ${token}`,
    });
    const response = res.base64();
    return response;
  }

  async signHash(password: string, documentHash: string, certFile?: any) {
    if (certFile == null) {
      certFile = await this.getCertFile();
    }
    const file = certFile;

    const emptySig = forge.util.hexToBytes(documentHash);

    const {pem, privateKey}: any = await this.getCertPem(password, file);
    const p7 = forge.pkcs7.createSignedData();
    p7.content = 'Arbitrary data';
    p7.addCertificate(pem);
    p7.addSigner({
      key: privateKey,
      certificate: pem,
      digestAlgorithm: forge.pki.oids.sha256,
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data,
        },
        {
          type: forge.pki.oids.messageDigest,
          value: forge.util.createBuffer(emptySig, 'binary'),
        },
      ],
    });
    p7.sign({detached: true});

    const out = forge.pkcs7.messageToPem(p7);

    const signedDocumentHash = forge.util.bytesToHex(
      forge.util.decode64(
        out
          .replace('-----BEGIN PKCS7-----', '')
          .replace('-----END PKCS7-----', '')
          .split('\r\n')
          .join(''),
      ),
    );
    return signedDocumentHash;
  }

  async getCertPem(password: string, certFile?: any) {
    try {
      if (certFile == null) {
        certFile = await this.getCertFile();
      }

      const pkcs12Der = forge.util.decode64(certFile);
      const pkcs12Asn1 = forge.asn1.fromDer(pkcs12Der);

      const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, false, password);
      let cert;
      let privateKey;

      for (let sci = 0; sci < pkcs12.safeContents.length; ++sci) {
        const safeContents = pkcs12.safeContents[sci];
        for (let sbi = 0; sbi < safeContents.safeBags.length; ++sbi) {
          const safeBag = safeContents.safeBags[sbi];
          if (safeBag.type === forge.pki.oids.keyBag) {
            // Found plain private key
            privateKey = safeBag.key;
          } else if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
            // found encrypted private key
            privateKey = safeBag.key;
          } else if (safeBag.type === forge.pki.oids.certBag) {
            // this bag has a certificate...
            cert = safeBag.cert;
          }
        }
      }
      const pem = forge.pki.certificateToPem(cert);

      return {pem, privateKey};
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export default new SignServices();
