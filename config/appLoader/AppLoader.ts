import TokenServices from '../../services/token/TokenServices';
import Observable from '../../Utils/Observable';

class AppLoader {
  public initLoaded = new Observable();
  constructor() {}
  async load() {
    await TokenServices.init();
    this.initLoaded.notify(true);
  }
}

export default new AppLoader();
