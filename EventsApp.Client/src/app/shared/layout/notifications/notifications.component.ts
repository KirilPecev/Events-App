import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../../core/services/notification.service";
import { Observable } from "rxjs";
import { Notification } from "../../../core/models/notification-model";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Array<Notification>>;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    this.notifications$ = this.notificationService.getNotifications();
  }

  deleteNotification(id: number) {
    this.notificationService
      .deleteNotification(id)
      .subscribe((data) => this.fetch());
  }
}
