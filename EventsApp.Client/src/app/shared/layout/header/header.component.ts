import { Component, OnInit, DoCheck } from "@angular/core";
import {
  faHome,
  faUserFriends,
  faFlag,
  faCalendarWeek,
  faSignInAlt,
  faUserPlus,
  faUsersCog,
  faSignOutAlt,
  faCog,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
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
  faUsersCog = faUsersCog;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;

  notifications: Array<Notification>;
  friends: Array<Friend>;
  newNotifications: number;
  newFriends: number;
  userId: string;

  constructor(
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

  updateFriendsCount(count: number){
    this.newFriends = count;
  }

  updateNotificationsCount(count: number){
    this.newNotifications = count;
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

  logout() {
    this.checked = false;
    this.userService.logout();
    this.router.navigate([""]);
  }
}
