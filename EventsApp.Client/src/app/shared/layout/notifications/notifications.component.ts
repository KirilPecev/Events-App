import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../../core/services/notification.service";
import { Notification } from "../../../core/models/notification-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationService: NotificationService) {
    this.fetch();
  }

  notificatios$: Observable<Array<Notification>>;

  ngOnInit(): void {}

  private fetch() {
    this.notificatios$ = this.notificationService.getNotifications();
  }

  deleteNotification(id: number) {
    this.notificationService
      .deleteNotification(id)
      .subscribe((data) => this.fetch());
  }
}
