import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {User} from "../models/user-model"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private path = environment.apiUrl;
  private loginPath = this.path + "identity/login";
  private registerPath = this.path + "identity/register";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginPath, { email, password });
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  logout() {
    localStorage.removeItem("token");
  }

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return this.getToken() ? true : false;
  }

  getUserInformation(id) {
    const params = new HttpParams().set("Id", id);
    return this.http.get<User>(this.path, { params });
  }

  saveUserId(id) {
    localStorage.setItem("userId", id);
  }

  getUserId() {
    return localStorage.getItem("userId");
  }
}
