import { Component, OnInit } from '@angular/core';
import { ProductResponse, ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  ProductResponse!: ProductResponse;
  totalPages=0
  currentPage=1;
  pagesArr:number[]=[];
  constructor(private productServ: ProductsService) { }

  ngOnInit(): void {
    this.productServ.onRequestParamsChanged().subscribe(res => {
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
