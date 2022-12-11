import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class PagingService {
  protected limit = 10;
  protected page = 1;
  protected searchQuery = '';
  protected defaultRequestParams!: RequestParamters

  RequestPramsChanged!: Subject<any>;
  setParamsChanged(requestParamsSubject: Subject<any>) {
    this.RequestPramsChanged = requestParamsSubject;
  }
  getParamsChanged() {
    return this.RequestPramsChanged;
  }
  setPage(page: number) {
    this.page = page;
    this.RequestPramsChanged.next(null);
  }

  setSearch(search: string) {
    this.searchQuery = search;
    this.RequestPramsChanged.next(null);
  }
  protected prepareRequestParams() {
    return this.defaultRequestParams = {
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
      q: this.searchQuery,
    };
  }
  getQueryString(requestParams:{[key:string]:any}){
    let query = "/?";
    for (let [key, value] of Object.entries(requestParams)) {
      if (!value) continue;
      query += `${key}=${value}&`;
    }
    return query.substring(0, query.length - 1);
  }
}
export interface RequestParamters {
  limit: number;
  skip: number;
  q: string;
}
