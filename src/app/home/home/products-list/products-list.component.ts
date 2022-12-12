import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductResponse, ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit,OnDestroy {
  ProductResponse!: ProductResponse;
  totalPages=0
  currentPage=11;
  pagesArr:number[]=[];
  productListSub!:Subscription
  constructor(private productServ: ProductsService) { }
  ngOnDestroy(): void {
    this.productListSub.unsubscribe();
  }

  ngOnInit(): void {
    this.productListSub=this.productServ.onRequestParamsChanged().subscribe(res => {
      this.ProductResponse =res;
      this.totalPages=Math.ceil(res.total/this.productServ.getLimit());
      this.pagesArr=[...Array(this.totalPages+1).keys()];
      this.pagesArr.splice(0,1);
    });

  }
  onChangePage(page:number){
    if(page!=this.currentPage){
      this.currentPage=page;
      this.productServ.setPage(page);
    }
  }


}
