import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class PagingService<T extends RequestParamters> {
  protected limit = 9;
  protected page = 1;
  protected searchQuery = '';
  protected defaultRequestParams!: T;
  protected RequestPramsChanged!: Subject<T >;
  constructor() {
    this.defaultRequestParams = {
      ...this.defaultRequestParams,
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
      q: this.searchQuery,
    }
  }
  getLimit() {
    return this.limit;
  }
  setParamsChanged(requestParamsSubject: Subject<T>) {
    this.RequestPramsChanged = requestParamsSubject;
  }
  getRequestPrams(): T {
    return this.defaultRequestParams;
  }
  getParamsChanged() {
    return this.RequestPramsChanged;
  }
  setRequestParams(requestParams: T) {
    this.defaultRequestParams = {
      ...this.defaultRequestParams,
      ...requestParams
    };
  }
  setPage(page: number) {
    this.page = page;
    this.RequestPramsChanged.next(this.defaultRequestParams);
  }

  setSearch(search: string) {
    const requestParams: T = {
      ...this.getRequestPrams(),
      q: search
    }
    this.setRequestParams(requestParams);
    this.RequestPramsChanged.next(requestParams);
  }
  protected prepareRequestParams():T {
    const requestParams = {
      ...this.getRequestPrams(),
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
    };
    this.setRequestParams(requestParams);
    return this.getRequestPrams();
  }
  getQueryString(requestParams: T) {
    let initPath = "";
    if (requestParams["q"]) initPath += "/search"
    let query = "/?";
    for (let [key, value] of Object.entries(requestParams)) {
      if (!value) continue;
      query += `${key}=${value}&`;
    }
    return initPath + query.substring(0, query.length - 1);
  }
}
export interface RequestParamters {
  limit: number;
  skip: number;
  q?: string;
}
