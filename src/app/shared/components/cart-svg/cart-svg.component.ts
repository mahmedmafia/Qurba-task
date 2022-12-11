import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-svg',
  templateUrl: './cart-svg.component.html',
  styleUrls: ['./cart-svg.component.scss']
})
export class CartSvgComponent implements OnInit {
  cartItems:number=0;
  constructor(private cartServ:CartService) { }

  ngOnInit(): void {
    this.cartServ.onAddToCart().subscribe(res=>{
      this.cartItems=res;
    })

  }

}
