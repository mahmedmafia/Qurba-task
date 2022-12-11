import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errMessage = '';
  constructor(private authServ: AuthService,private router:Router) {}

  ngOnInit(): void {
    if(this.authServ.isLoggedIn()){
      console.log('yeah');
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl('kminchelle', Validators.required),
      password: new FormControl('0lelplR', Validators.required),
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.authServ
        .login(this.loginForm.value)
        .subscribe({ error: (e) => (this.errMessage = e.message) });
    }
  }
}
