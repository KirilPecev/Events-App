import { Component, OnInit, Input } from '@angular/core';

import { faHome, faUserFriends, faFlag, faCalendarWeek, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'EventsApp';
  faHome = faHome;
  faUserFriends = faUserFriends;
  faFlag = faFlag;
  faCalendarWeek = faCalendarWeek;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;

  @Input() isLoggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
