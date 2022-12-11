import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems=0;
  private cartSubjcet:BehaviorSubject<number>
  constructor() {
   this.cartSubjcet=new BehaviorSubject<number>(this.cartItems);
  }
  AddToCart(){
    this.cartItems+=1;
    this.cartSubjcet.next(this.cartItems);
  }
  onAddToCart(){
    return this.cartSubjcet;
  }
}
