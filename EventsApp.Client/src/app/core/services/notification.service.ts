import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Notification } from "../models/notification-model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notificationPath = environment.apiUrl + "notifications";

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(this.notificationPath);
  }

  deleteNotification(id: number) {
    return this.http.delete(this.notificationPath + "/" + id);
  }
}
