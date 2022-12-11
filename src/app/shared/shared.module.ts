import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLogoComponent } from './components/navbar-logo/navbar-logo.component';
import { StarSvgComponent } from './components/star-svg/star-svg.component';



@NgModule({
  declarations: [
    NavbarLogoComponent,
    StarSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarLogoComponent,
    StarSvgComponent
  ]
})
export class SharedModule { }
