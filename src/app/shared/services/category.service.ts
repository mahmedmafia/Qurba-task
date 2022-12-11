import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin, from, map, mergeMap, Observable, of, reduce, tap, toArray } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private AllCategories = environment.api + '/products/categories';
  private categoryApi = environment.api + '/products/category';
  constructor(private http: HttpClient) { }
  getAllCategories():Observable<{data:CategoryInfo[],total:number}> {
    return this.http.get<string[]>(this.AllCategories).pipe(
      mergeMap(x => from(x)),
      mergeMap(h=> this.getProductCategoriesCount(h).pipe(map(categoryInfo=>{
        return {
          category:h,
          count:categoryInfo.total,
        }
      }))),
      reduce((object:any,val)=>{
        object.data=[...object.data,val];
        object.total+=val.count;
        return object;
      },{data:[],total:0}),
    );
  }
  getProductCategoriesCount(category: string) {
    return this.http.get<any>(this.categoryApi + `/${category}`);
  }
}

export interface CategoryInfo{
  category:string,
  count:number
}
