import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, switchMap } from 'rxjs';
import { AuthService, UserData } from '../shared/services/auth.service';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.scss']
})
export class HeaderNavBarComponent implements OnInit {
  userData: UserData | null = null;
  searchForm!: FormGroup | null;
  showList=false;
  constructor(private authServ: AuthService,private router:Router ,private prodServ: ProductsService) { }

  ngOnInit(): void {
    // getting notifcation when userData Changed => user or null
    this.authServ.AuthSubject.subscribe(res => {
      this.userData = res;
      this.showList=false;
      if (this.userData) {
        this.searchForm = new FormGroup({
          searchTerm: new FormControl('')
        })
      }else{
        this.searchForm=null;
      }
    })
    //search based on input and wait for latest input change to send rquest
    this.searchForm?.controls['searchTerm'].valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(res => {
      this.prodServ.setSearch(res);
      this.showList=false;
    })
  }
  logOut(){
    //logout
    this.authServ.LogOut();
  }
  navigate(path:string){
    //to close list on navigation
    this.showList=false;
    this.router.navigate([path]);
  }

}
