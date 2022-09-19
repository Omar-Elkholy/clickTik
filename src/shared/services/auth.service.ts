import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  loggedInUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user: Login) {
    return this.http.post(this.apiUrl + 'auth/login', user)
      .pipe(
        map((user: any) => {
          this.setCurrentUser(user);
        })
      )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedInUser$.next(user);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUser$.next(null)
  }
}


