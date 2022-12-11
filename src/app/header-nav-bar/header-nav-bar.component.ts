import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  searchForm!: FormGroup;
  constructor(private authServ: AuthService, private prodServ: ProductsService) { }

  ngOnInit(): void {
    this.authServ.AuthSubject.subscribe(res => {
      this.userData = res;
      if (this.userData) {
        this.searchForm = new FormGroup({
          searchTerm: new FormControl('')
        })
      }
    })
    this.searchForm.controls['searchTerm'].valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(res => {
      this.prodServ.setSearch(res)
    })
  }

}
