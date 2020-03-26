import { Component, OnInit, Input } from '@angular/core';

import { faHome, faUserFriends, faFlag, faCalendarWeek, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsComponent } from '../notifications/notifications.component';
import { FriendsComponent } from '../friends/friends.component';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Evenity';
  faHome = faHome;
  faUserFriends = faUserFriends;
  faFlag = faFlag;
  faCalendarWeek = faCalendarWeek;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;

  @Input() isLoggedIn: boolean;

  constructor(
    private notificationsDialog: MatDialog,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  openNotificationsDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.height = "25%";
    dialogConfig.width = "23%";
    dialogConfig.position = {
      "top": "50px",
      "right": "25.6%"
    };

    this.notificationsDialog.open(NotificationsComponent, dialogConfig);
  }

  openFriendsDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.height = "25%";
    dialogConfig.width = "20%";
    dialogConfig.position = {
      "top": "50px",
      "right": "28%"
    };

    this.notificationsDialog.open(FriendsComponent, dialogConfig);
  }

  logout() {
    this.userService.logout()
      .subscribe(() => this.router.navigate(['']));
  }
}
