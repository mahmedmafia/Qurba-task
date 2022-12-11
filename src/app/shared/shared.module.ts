import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLogoComponent } from './components/navbar-logo/navbar-logo.component';
import { StarSvgComponent } from './components/star-svg/star-svg.component';
import { CartSvgComponent } from './components/cart-svg/cart-svg.component';
import { SearchGlassSvgComponent } from './components/search-glass-svg/search-glass-svg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarLogoComponent,
    StarSvgComponent,
    CartSvgComponent,
    SearchGlassSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarLogoComponent,
    StarSvgComponent,
    CartSvgComponent,
    SearchGlassSvgComponent
  ]
})
export class SharedModule { }
