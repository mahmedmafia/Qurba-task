import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap ,BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingService, RequestParamters } from './paging.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends PagingService {
  private selectedCategory = "";
  private productRequestPrams!: ProductParamters
  private Allproducts = environment.api + '/products';
  RroductPramsChanged: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    super();
    super.setParamsChanged(this.RroductPramsChanged);
    this.productRequestPrams = {
      ...this.defaultRequestParams,
      category: this.selectedCategory,
    }
  }
  getAllProducts() {
    var queryPath = this.getPath();
    return this.http.get<ProductResponse>(this.Allproducts + queryPath);
  }
  onRequestParamsChanged(): Observable<ProductResponse> {
    return this.getParamsChanged().pipe(switchMap(x => this.getAllProducts()));
  }
  setCategory(category: string) {
    this.productRequestPrams.category = category;
    this.RroductPramsChanged.next(null);
  }

  private getPath() {
    const requestParms = this.prepareRequestParams();
    let extenedPath = "";
    if (this.productRequestPrams.category) extenedPath += "/category/" + this.productRequestPrams.category;
    let query = this.getQueryString(requestParms);
    return extenedPath + query;
  }
}
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface ProductParamters extends RequestParamters {
  category: string;
}
