import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pathObject: PathObject = {
    Home: "Home",
    Type: "Products",
    Category: "",
    SearchTerm: "",
  }
  keys: (keyof PathObject)[] = ["Home", "Type", "Category", "SearchTerm"];
  constructor(private prodServ:ProductsService) { }

  ngOnInit(): void {
    this.prodServ.RroductPramsChanged.subscribe(res=>{
      this.pathObject.Category=res?.category!;
      this.pathObject.SearchTerm=res?.q!;
    })
  }


}
interface PathObject {
  Home: string,
  Type: string,
  Category?: string,
  SearchTerm?: string,
}
