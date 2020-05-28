import { Component, OnInit, Inject } from "@angular/core";
import { NotificationService } from "../../../core/services/notification.service";
import { Observable } from "rxjs";
import { Notification } from "../../../core/models/notification-model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Array<Notification>>;
  constructor(
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  private fetch() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.data.notifications = data;
    });
  }

  deleteNotification(id: number) {
    this.notificationService
      .deleteNotification(id)
      .subscribe((data) => this.fetch());
  }
}
