import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  onSelectCategory(category:string) {
    this.pathObject.Category=category;
    console.log(this.pathObject);
  }

}
interface PathObject {
  Home: string,
  Type: string,
  Category: string,
  SearchTerm: string,
}
