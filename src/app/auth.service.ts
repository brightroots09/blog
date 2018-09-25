import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userLoginUrl = "/login";

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user){
    return this.http.post<any>(this._userLoginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(user){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
