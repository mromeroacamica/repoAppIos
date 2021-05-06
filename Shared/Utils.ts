export class Utils {
  // BUSQUEDA DE OBJETOS
  static searchObjInArray<T>(
    arr: T[],
    field: keyof T,
    value: any,
    options?: SearchOptions,
  ) {
    return Utils.searchObjDeepInArray(arr, field, value, options);
  }

  static searchObjDeepInArray<T>(
    arr: T[],
    field: any,
    value: any,
    options?: SearchOptions,
  ) {
    let elem: any;
    if (arr == null) {
      return {
        obj: null,
        index: -1,
      };
    }
    options = {ignoreCase: false, ...options};
    for (let i = 0; i < arr.length; i++) {
      elem = Utils.getElemByPath(arr[i], field);
      if (options.ignoreCase == true) {
        elem = elem.toUpperCase();
        value = value.toUpperCase();
      }
      if (elem && elem === value) {
        return {
          obj: arr[i],
          index: i,
        };
      }
    }
    return {
      obj: null,
      index: -1,
    };
  }

  private static getElemByPath<T>(obj: T, path: string) {
    const paths = path.split('.');
    let elem: any = obj;
    for (let i = 0; i < paths.length; i++) {
      elem = elem[paths[i]];
    }

    return elem;
  }

  static async sleep(ms: number, error?: any) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (error != null) {
          reject();
        } else {
          resolve('');
        }
      }, ms);
    });
  }

  /**
   * @deprecated
   */
  static getDateTimeString(date: Date, separator = {date: '/', hour: ':'}) {
    const year = date.getUTCFullYear();
    let month: any = date.getUTCMonth() + 1;
    let day: any = date.getUTCDate();
    let hours: any = date.getHours();
    let minute: any = date.getMinutes();
    let seconds: any = date.getSeconds();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minute = minute < 10 ? `0${minute}` : minute;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
      `${year}${separator.date}${month}${separator.date}${day}_` +
      `${hours}${separator.hour}${minute}${separator.hour}${seconds}`
    );
  }

  // PROMESAS EN PARALELO
  static async parallelPromise<T>(
    promises: (() => Promise<T>)[],
    max = 4,
    errorHandler = (e: any) => {
      console.error(e);
    },
  ) {
    return new Promise((resolve) => {
      const queue = [...promises];
      let count = 0;

      const addCount = (c: any) => {
        count += c;
        if (count === 0) {
          resolve('');
        }
      };

      for (let i = 0; i < max && queue.length > 0; i++) {
        const prom: any = queue.shift();
        count++;
        prom()
          .then(() => {
            this._promiseRecursion(addCount, queue, errorHandler);
            addCount(-1);
          })
          .catch((err: any) => {
            this._promiseRecursion(addCount, queue, errorHandler);
            addCount(-1);
            errorHandler(err);
          });
      }
    });
  }

  private static _promiseRecursion<T>(
    addCount: (count: number) => void,
    queue: (() => Promise<T>)[],
    errorHandler: (e: any) => void,
  ) {
    if (queue.length === 0) {
      return;
    }

    const prom: any = queue.shift();
    addCount(1);
    prom()
      .then(() => {
        this._promiseRecursion(addCount, queue, errorHandler);
        addCount(-1);
      })
      .catch((err: any) => {
        this._promiseRecursion(addCount, queue, errorHandler);
        addCount(-1);
        errorHandler(err);
      });
  }

  // COPIAR OBJETOS
  /**
   * Metodo que se utiliza para transformar un
   * objeto plano en un objeto de una clase.
   * Las propiedades que se copiarán deben estar
   * inicializadas en el objeto a copiar.
   * Si la propiedad no esta en el objeto plano,
   * esta no se copiará.
   *
   * NO COPIA DE FOMRA RECURSIVA
   * SOLO COPIA EL OBJETO DE PRIMER NIVEL
   */
  static copyToObj<T>(dest: any, keys: (keyof T)[], src: any, sufix?: any): T {
    // tslint:disable-next-line: forin
    for (const key of keys) {
      if (src[key] == null) {
        continue;
      }

      if (Array.isArray(src[key])) {
        dest[key] = this.copyArrayObj(src[key]) as any;
      } else if (typeof src[key] === 'object') {
        dest[key] = this.copyObj(src[key]);
      } else {
        dest[key] = src[key];
      }

      if (sufix != null) {
        dest[key] = dest[key][sufix];
      }
    }

    return dest;
  }

  static copyToArrayObj<T>(
    Type: new () => T,
    keys: (keyof T)[],
    arrToCopy: any[],
    sufix?: any,
  ): T[] {
    const out: T[] = [];
    for (const elem of arrToCopy) {
      out.push(this.copyToObj(new Type(), keys, elem, sufix));
    }
    return out;
  }

  static copyArrayObj(array: any[]) {
    const out: any[] = [];

    if (Array.isArray(array) === false) {
      return null;
    }

    for (let i = 0; i < array.length; i++) {
      const elem = array[i];
      if (Array.isArray(elem)) {
        out.push(this.copyArrayObj(elem));
      } else if (typeof elem === 'object') {
        out.push(this.copyObj(elem));
      } else {
        out.push(elem);
      }
    }

    return out;
  }

  static copyObj<T>(obj: any): T | null {
    const out: any = {};

    if (obj == null) {
      return null;
    }

    const keys = Object.keys(obj);

    for (const key of keys) {
      if (Array.isArray(obj[key])) {
        out[key] = this.copyArrayObj(obj[key]);
      } else if (typeof obj[key] === 'object') {
        out[key] = this.copyObj(obj[key]);
      } else {
        out[key] = obj[key];
      }
    }

    return out;
  }

  // INSERTAR EN EL STRING
  static insertIntoString(str: string, strInclude: string, position: number) {
    return [str.slice(0, position), strInclude, str.slice(position)].join('');
  }

  // FECHAS
  static getTimeZoneOffset(date = new Date()): string {
    let localTime: any = date.getTimezoneOffset() / 60;
    const signo = Math.sign(localTime) < 0 ? '+' : '-';
    localTime = Math.abs(localTime);
    if (localTime < 10) {
      localTime = '0' + localTime;
    }

    return `${signo}${localTime}:00`;
  }

  static getTimeFormat(date: any): string {
    if (date.getMinutes() < 10) {
      return date.getHours() + ':0' + date.getMinutes();
    } else {
      return date.getHours() + ':' + date.getMinutes();
    }
  }

  static daysDiff(d1: any, d2: any) {
    // To calculate the time difference of two dates
    const diffInTime = d2.getTime() - d1.getTime();
    // To calculate the no. of days between two dates
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    const diffInDaysR =
      diffInDays > 0 ? Math.floor(diffInDays) : Math.ceil(diffInDays);
    return diffInDaysR;
  }
  static hoursDiff(d1: any, d2: any) {
    // To calculate the time difference of two dates
    const diffInTime = d2.getTime() - d1.getTime();
    // To calculate the no. of days between two dates
    const diffInHours = diffInTime / (1000 * 3600);
    return diffInHours;
  }

  static getDateFormat(
    options: {date?: Date; format?: string; utc?: boolean} = {},
  ): string {
    const data = {
      date: new Date(),
      format: 'Y/M/D h:m:s',
      utc: false,
      ...options,
    };
    let out = data.format;

    const year =
      data.utc === true ? data.date.getUTCFullYear() : data.date.getFullYear();
    const month =
      1 + (data.utc === true ? data.date.getUTCMonth() : data.date.getMonth());
    const day =
      data.utc === true ? data.date.getUTCDate() : data.date.getDate();
    const hour =
      data.utc === true ? data.date.getUTCHours() : data.date.getHours();
    const minute =
      data.utc === true ? data.date.getUTCMinutes() : data.date.getMinutes();
    const second =
      data.utc === true ? data.date.getUTCSeconds() : data.date.getSeconds();

    // Año
    out = out.replace(/Y+/g, year.toString().padStart(4, '0'));

    // Mes
    out = out.replace(/M+/g, month.toString().padStart(2, '0'));

    // Dia
    out = out.replace(/D+/g, day.toString().padStart(2, '0'));

    // Hora
    out = out.replace(/h+/g, hour.toString().padStart(2, '0'));

    // Minuto
    out = out.replace(/m+/g, minute.toString().padStart(2, '0'));

    // Segundo
    out = out.replace(/s+/g, second.toString().padStart(2, '0'));

    return out;
  }

  static getLocalTimestamp(date = new Date(), offsetSig: 1 | -1 = 1) {
    return date.getTime() - date.getTimezoneOffset() * 60000 * offsetSig;
  }

  static compareObject(obj1: any, obj2: any) {
    const keys = Object.keys(obj1);
    if (Object.keys(obj2).length !== keys.length) {
      return false;
    }

    for (const key of keys) {
      if (obj2[key] == null || obj2[key] !== obj1[key]) {
        return false;
      }
    }

    return true;
  }
  static deepEqual(o1: any, o2: any) {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }

  // Funciona para saber si un elemento es padre de un elemento o el mismo elemento.
  static isParentOrElement(elem: HTMLElement, htmlElem: any): any {
    if (htmlElem == null) {
      return false;
    } else if (elem === htmlElem) {
      return true;
    } else {
      return this.isParentOrElement(elem, htmlElem.parentElement);
    }
  }
}

interface SearchOptions {
  ignoreCase?: boolean;
}
