import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from 'src/app/shared/services/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!:Product;
  constructor(private cartServ:CartService) {
  }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartServ.AddToCart();
  }

}
