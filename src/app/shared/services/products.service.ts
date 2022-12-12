import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  switchMap,
  BehaviorSubject,
  map,
  observable,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingService, RequestParamters } from './paging.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends PagingService<ProductParamters> {
  selectedCategory = '';
  private productRequestPrams!: ProductParamters;
  private Allproducts = environment.api + '/products';
  RroductPramsChanged: BehaviorSubject<ProductParamters> =
    new BehaviorSubject<ProductParamters >(null!);
  constructor(private http: HttpClient) {
    //call super constructor
    super();
    this.productRequestPrams = {
      ...this.defaultRequestParams,
      category: this.selectedCategory,
    };
    //set the parent Subject dynamically so we can refernce it later from parent
    super.setParamsChanged(this.RroductPramsChanged);
    //set the parent Request Params dynamically so we can refernce it later from parent
    this.setRequestParams(this.productRequestPrams);
  }
  getAllProducts() {
    //basic getting all products based on some path will be dynamically created
    var queryPath = this.getPath();
    return this.http.get<ProductResponse>(this.Allproducts + queryPath);
  }

  onRequestParamsChanged():Observable<ProductResponse>{
    /*when ever request params changed will chain a call to get all products
    and switch requests if any request came
    */
    return this.getParamsChanged().pipe(
      switchMap((params) =>{return this.getAllProducts().pipe(map(data=>{
        return {
          data,
          params
        }
      }))}),
      this.filterProductsIFCategoryChanged,
    );
  }
  filterProductsIFCategoryChanged(obs: Observable<{data:ProductResponse,params:ProductParamters}>) {
    /* due to we can not send request to have product categories and search at the same time
     will do the filtering of products if we have products based on category
    now to think about it we can do it  vice versa but getting request at first based on categories is more stable
    than a query param search
    */
    return obs.pipe(
      map((res) => {
        if(!res.params) return res.data
        if(!res.params?.category && res.params?.q) return res.data;
        const filteredProducts = res.data.products.filter((pr) =>
          pr.title.includes(res.params.q!)? pr:null
        );
        return {
          ...res.data,
          products: filteredProducts,
        };
      })
        );
  };

setCategory(category: string) {
  /*
  first will set the category in the request params
  then emit it to request for products based on the new selected category
  */
  this.selectedCategory = category;
  this.productRequestPrams = {
    ...this.getRequestPrams(),
    category: category,
    skip:0,
  };
  this.setRequestParams(this.productRequestPrams);
  this.RroductPramsChanged.next(this.productRequestPrams);
}

  private getPath() {
    //getting the additional path based on request params
  const requestParms ={... this.prepareRequestParams()};
  let extenedPath = '';
  if (this.productRequestPrams.category) {
    extenedPath += '/category/' + this.productRequestPrams.category;
    /*
    deleting query as you cant search of product while requesting /product/category/{categoryName}
    so we wont be needing to add the /search url path in getQueryStringFunc
    */
    delete requestParms['q'];
    delete requestParms['category'];
  }
  let query = this.getQueryString(requestParms);
  return this.productRequestPrams.q ? query : extenedPath + query;
}
}
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface ProductParamters extends RequestParamters {
  category?: string;
}
