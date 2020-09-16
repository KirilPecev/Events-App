import { Component, Input, OnInit } from "@angular/core";
import { NotificationService } from "../../../core/services/notification.service";
import { Notification } from "../../../core/models/notification-model";
import { Observable } from "rxjs";
import { Output, EventEmitter } from "@angular/core";
import { tap } from "rxjs/operators";

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
  @Input() notificationsData = Array<Notification>();
  @Output() notificationsCount = new EventEmitter<number>();

  ngOnInit(): void {}

  private fetch() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notificationsData = data;
      this.notificationsCount.emit(data.length);
    });
  }

  deleteNotification(id: number) {
    this.notificationService
      .deleteNotification(id)
      .subscribe((data) => this.fetch());
  }
}
