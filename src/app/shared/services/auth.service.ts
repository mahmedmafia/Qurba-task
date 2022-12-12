import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private user: UserData | null=null;
  private authApi = environment.api + '/auth/login';
  AuthSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.getToken();
    this.AuthSubject.next(this.user);
  }
  login(userInfo: userLoginData) {
    return this.http
      .post<UserData>(this.authApi, userInfo)
      .pipe(map((x) => this.onLogin(x)));
  }
  isLoggedIn() {
    return this.token ? true : false;
  }
  getToken() {
    this.user = this.user? this.user: JSON.parse(localStorage.getItem('user')!);
    if (!this.user) return null;
    this.token=this.user.token
    return this.token;
  }
  private onLogin(user: UserData) {
    this.user = user;
    this.token = user.token;
    localStorage.setItem('user', JSON.stringify(user));
    this.AuthSubject.next(user);
    this.router.navigate(['/home']);
  }
  LogOut() {
    this.token='';
    this.user=null;
    this.router.navigate(['/auth/login']);
    this.AuthSubject.next(null);
    localStorage.clear();
  }
}
interface userLoginData {
  usernam: string;
  password: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
