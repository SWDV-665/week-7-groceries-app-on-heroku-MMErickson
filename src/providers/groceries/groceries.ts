import { Injectable } from '@angular/core';

// HTTP module
import { HttpClient } from '@angular/common/http'; // , HttpClientModule
import { Observable } from 'rxjs/Observable';

import {map, catchError } from 'rxjs/operators';

import { Subject } from 'rxjs';

/*
  Generated class for the GroceriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GroceriesProvider {

  // Array of grocery items
  items = [];

  /* Hardcoded example of grocery items list
  items = [
    {
      name: 'Milk',
      quantity: 2
    },
    {
      name: 'Bread',
      quantity: 1
    },
    {
      name: 'Eggs',
      quantity: 1
    },
    {
      name: 'Apples',
      quantity: 2
    },
  ];
  */

  dataChanged$: Observable<boolean>;
  
  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";


  constructor(public http: HttpClient) {
    console.log('Hello GroceriesProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();

  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
    
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(item, index) {
    this.items[index] = item;
  }

}
