import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Qurba-task';
  constructor(private authServ:AuthService,private router:Router){
    if(this.authServ.isLoggedIn()){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/auth']);
    }
  }
}
