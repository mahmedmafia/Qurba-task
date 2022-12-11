import { Component, OnInit } from '@angular/core';
import { ProductResponse, ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  ProductResponse!: ProductResponse
  constructor(private productServ: ProductsService) { }

  ngOnInit(): void {
    this.productServ.onRequestParamsChanged().subscribe(res => {
      this.ProductResponse = res;
    });

  }

}
