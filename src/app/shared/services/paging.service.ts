import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//generic service to handle basic params change
export abstract class PagingService<T extends RequestParamters> {
  //basic request params needed
  protected limit = 9;
  protected page = 1;
  protected searchQuery = '';
  protected defaultRequestParams!: T;
  protected RequestPramsChanged!: Subject<T >;
  constructor() {
    //init default params from the current context
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
    //for setting subject from children classes
    this.RequestPramsChanged = requestParamsSubject;
  }
  getRequestPrams(): T {
    //getting the request params in the context
    return this.defaultRequestParams;
  }
  getParamsChanged():Subject<T> {
    //getting the subject in the context
    return this.RequestPramsChanged;
  }
  setRequestParams(requestParams: T) {
    //for setting requestparams from children classes
    this.defaultRequestParams = {
      ...this.defaultRequestParams,
      ...requestParams
    };
  }
  setPage(page: number) {
    //setting current page and emitting change to request products
    this.page = page;
    this.RequestPramsChanged.next(this.defaultRequestParams);
  }

  setSearch(search: string) {
    // same as above but setting searchParams
    const requestParams: T = {
      ...this.getRequestPrams(),
      q: search
    }
    this.setRequestParams(requestParams);
    this.RequestPramsChanged.next(requestParams);
  }
  protected prepareRequestParams():T {
    //what combine all of the request params components and calclate paging and skip
    const requestParams = {
      ...this.getRequestPrams(),
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
    };
    this.setRequestParams(requestParams);
    return this.getRequestPrams();
  }
  getQueryString(requestParams: T) {
    //genere the basic additional string params needed

    let initPath = "";

    //if we have query we will need to append the /search path not just the query params :(
    if (requestParams["q"]) initPath += "/search"
    let query = "/?";
    //here we append the basic query params
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
