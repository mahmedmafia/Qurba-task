import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryInfo, CategoryService } from 'src/app/shared/services/category.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit,OnDestroy {
  cateogries: CategoryInfo[] = [];
  categoiesForm!: FormGroup
  selectedCategory:string='';
  totalProducts:number=0;
  categListSub!:Subscription
  constructor(private categoryServ: CategoryService,private productServ:ProductsService) {
    // i added a change in html to getAllCategories so we can reset category selection
  }
  ngOnDestroy(): void {
    this.categListSub.unsubscribe();
  }
  ngOnInit(): void {
    const localCategories = localStorage.getItem('categories');
    // getting categories and restoring in localstorage if not found
    if (!localCategories) {
      this.categListSub=this.categoryServ.getAllCategories().subscribe(res => {
        this.cateogries = res.data;
        this.totalProducts=res.total;
        localStorage.setItem('categories', JSON.stringify(res));
      });
    } else {
      const res = JSON.parse(localCategories);
      this.totalProducts=res.total;
      this.cateogries=res.data;
    }
    //making one input to keep it one choice as category
    this.categoiesForm = new FormGroup({
      category: new FormControl(''),
    })

  }
  onChooseCategory(category:string){
    /*
    can be handled if we use form change if if i think about it to prevent this case and will better than attatching alot of click listeners
    */
    if(category==this.selectedCategory) return;
    this.selectedCategory=category;
    this.productServ.setCategory(category);
  }
}
