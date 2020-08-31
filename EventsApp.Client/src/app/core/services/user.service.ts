import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../models/user-model";
import { Friend } from "../models/friend-model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private path = environment.apiUrl + "identity";
  private loginPath = this.path + "/login";
  private registerPath = this.path + "/register";

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

  getUserInformation(id: string) {
    return this.http.get<User>(this.path + "/" + id);
  }

  getCreatedEventsAmount(id: string) {
    const params = new HttpParams().set("userId", id);
    return this.http.get<User>(this.path + "/events", { params });
  }

  saveUserInfo(id, fullName) {
    localStorage.setItem("userId", id);
    localStorage.setItem("fullName", fullName);
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  getUserFullName() {
    return localStorage.getItem("fullName");
  }

  update(data): Observable<any> {
    return this.http.put(this.path, data);
  }

  getFriends(userId: string) {
    const params = new HttpParams().set("userId", userId);
    return this.http.get<Array<Friend>>(this.path + "/friends", { params });
  }

  getPendingFriends(): Observable<Array<Friend>> {
    return this.http.get<Array<Friend>>(this.path + "/pendingfriends");
  }

  acceptFriendship(friendId: string) {
    let data = {
      friendId: friendId,
    };

    return this.http.put(this.path + "/accept", data);
  }

  addFriend(friendId: string){
    let data = {
      friendId: friendId,
    };

    return this.http.put(this.path + "/friend", data);
  }

  removeFriendship(friendId: string) {
    const params = new HttpParams().set("id", friendId);
    return this.http.delete(this.path + "/removefriendship", { params });
  }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.path + "/users");
  }
}
