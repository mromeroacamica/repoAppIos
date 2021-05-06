import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Observable from '../../Utils/Observable';

class TokenServices {
  constructor() {
    this.token = new Observable();
  }
  async setToken(token) {
    try {
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem('token', jsonValue);
      this.token.notify(token);
      return true;
    } catch (e) {
      // saving error
      return false;
    }
  }
  getToken() {
    return this.token.getValue();
  }
  async init() {
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      jsonValue != null ? this.token.notify(JSON.parse(jsonValue)) : null;
      return;
    } catch (e) {
      // error reading value
    }
  }
}
export default new TokenServices();
