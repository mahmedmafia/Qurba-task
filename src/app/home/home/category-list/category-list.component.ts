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
  totalProducts:number=0;
  constructor(private categoryServ: CategoryService,private productServ:ProductsService) { }
  ngOnInit(): void {
    const localCategories = localStorage.getItem('categories');
    if (!localCategories) {
      this.categoryServ.getAllCategories().subscribe(res => {
        this.cateogries = res.data;
        this.totalProducts=res.total;
        localStorage.setItem('categories', JSON.stringify(res));
      });
    } else {
      const res = JSON.parse(localCategories);
      this.totalProducts=res.total;
      this.cateogries=res.data;
    }

    this.categoiesForm = new FormGroup({
      category: new FormControl(''),
    })

  }
  onChooseCategory(category:string){
    this.productServ.setCategory(category);
  }
}
