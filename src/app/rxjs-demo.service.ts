import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsDemoService {

  constructor() {
  }


  // asyn function
  getData() {
    return 'async message';
  }

  /**
   * settimeout为定时器，1s后执行方法
   * @param cb
   */
  getCallbackData(cb) {
    setTimeout(() => {
      const name = 'lily';
      cb(name);
    }, 1000);
  }

// promise 异步
  getPromiseData() {
    return new Promise((resolve, rejects) => {
      setTimeout(() => {
        const name = 'lily promise';
        resolve(name);   // 成功的时候返回的数据
        // rejects('error'); // 失败的时候返回的数据
      }, 1000);
    });
  }

  // rxjs 异步数据
  getRxjsData() {
    return new Observable((observer) => {
      setTimeout(() => {
        const name = 'lily rxjs';
        observer.next(name);   // 成功的时候返回的数据
      }, 3000);
    });
  }


  // promise 异步数据，只能执行一次，不能循环执行
  getPromiseInternalData() {
    return new Promise(resolve => {
      let count = 0;
      setInterval(() => { //  setInternal为延时器
        resolve(count++);
      }, 1000);
    });
  }


  // rxjs 异步数据 ，可以循环执行多次
  getRxjsInternalData() {
    return new Observable<any>((observer) => {
      let count = 0;
      setInterval(() => {
        count++;
        // const name = 'lily rxjs' + count;
        const name = +count;
        observer.next(name);   // 成功的时候返回的数据
      }, 1000);
    });
  }


}
