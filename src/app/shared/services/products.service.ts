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
    super();
    this.productRequestPrams = {
      ...this.defaultRequestParams,
      category: this.selectedCategory,
    };
    super.setParamsChanged(this.RroductPramsChanged);
    this.setRequestParams(this.productRequestPrams);
  }
  getAllProducts() {
    var queryPath = this.getPath();
    return this.http.get<ProductResponse>(this.Allproducts + queryPath);
  }

  onRequestParamsChanged():Observable<ProductResponse>{
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
  const requestParms ={... this.prepareRequestParams()};
  let extenedPath = '';
  if (this.productRequestPrams.category) {
    extenedPath += '/category/' + this.productRequestPrams.category;
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
