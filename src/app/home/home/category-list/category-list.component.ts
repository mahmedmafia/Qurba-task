import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryInfo, CategoryService } from 'src/app/shared/services/category.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  cateogries: CategoryInfo[] = [];
  categoiesForm!: FormGroup
  selectedCategory:string='';
  @Output() selectCategoryEvent=new EventEmitter();
  constructor(private categoryServ: CategoryService,private productServ:ProductsService) { }
  ngOnInit(): void {
    const localCategories = localStorage.getItem('categories');
    if (!localCategories) {
      this.categoryServ.getAllCategories().subscribe(res => {
        this.cateogries = res;
        localStorage.setItem('categories', JSON.stringify(res));
      });
    } else {
      this.cateogries = JSON.parse(localCategories);
    }

    this.categoiesForm = new FormGroup({
      category: new FormControl(''),
    })

  }
  onChooseCategory(event:any,category:string){
    const isChecked=event.currentTarget.checked;
    if(isChecked){
      this.selectedCategory=category;

    }else{
     this.selectedCategory='';
    }
    this.selectCategoryEvent.emit(this.selectedCategory);
    this.productServ.setCategory(this.selectedCategory);
  }
}
