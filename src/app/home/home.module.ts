import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './home/products-list/products-list.component';
import { CategoryListComponent } from './home/category-list/category-list.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './home/products-list/product/product.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsListComponent,
    CategoryListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
