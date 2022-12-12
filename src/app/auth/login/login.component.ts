import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;
  errMessage = '';
  loginSub!:Subscription
  constructor(private authServ: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authServ.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      //in the design its mentioned email but there is no email authentication in the api
      // so i changed it to username
      //username=kminchelle ,password=0lelplR
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      //login and if there is anyerror message show it to user and then hide it after 1 second
      this.loginSub=this.authServ
        .login(this.loginForm.value)
        .subscribe({
          error: (e) => {
            this.errMessage = e.error.message
            setTimeout(()=>{
              this.errMessage='';
            },1000);
          }
        });
    }
  }
}
