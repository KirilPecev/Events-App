import { Component, OnInit, DoCheck, OnDestroy } from "@angular/core";
import {
  faHome,
  faUserFriends,
  faFlag,
  faCalendarWeek,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NotificationsComponent } from "../notifications/notifications.component";
import { FriendsComponent } from "../friends/friends.component";
import { UserService } from "../../../core/services/user.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { Notification } from "../../../core/models/notification-model";
import { Friend } from "../../../core/models/friend-model";
import { interval } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, DoCheck {
  title = "Evenity";
  faHome = faHome;
  faUserFriends = faUserFriends;
  faFlag = faFlag;
  faCalendarWeek = faCalendarWeek;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;

  notifications: Array<Notification>;
  friends: Array<Friend>;
  newNotifications: number;
  newFriends: number;
  userId: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  isLoggedIn = () => this.userService.isLoggedIn();

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.fetch();
    }
  }

  checked: boolean = false;

  ngDoCheck(): void {
    if (this.isLoggedIn() && !this.checked) {
      this.checked = true;
      interval(2 * 60 * 1000).subscribe((x) => {
        this.fetch();
      });

      this.fetch();
    }
  }

  private fetch() {
    this.userId = this.userService.getUserId();
    this.getNotificationsData();
    this.getFriendsData();
  }

  private getNotificationsData() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
      this.newNotifications = data.length;
    });
  }

  private getFriendsData() {
    this.userService.getPendingFriends().subscribe((data) => {
      this.newFriends = data.length;
      this.friends = data;
    });
  }

  openNotificationsDialog() {
    const dialogConfig = this.getDialogConfig();
    this.dialog
      .open(NotificationsComponent, dialogConfig)
      .afterClosed()
      .subscribe((x) => {
        this.fetch();
      });
  }

  openFriendsDialog() {
    const dialogConfig = this.getDialogConfig();
    this.dialog
      .open(FriendsComponent, dialogConfig)
      .afterClosed()
      .subscribe((x) => {
        this.fetch();
      });
  }

  logout() {
    this.checked = false;
    this.userService.logout();
    this.router.navigate([""]);
  }

  private getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      notifications: this.notifications,
      friends: this.friends,
    };

    return dialogConfig;
  }
}
