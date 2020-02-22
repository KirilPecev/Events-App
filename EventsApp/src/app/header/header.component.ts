import { Component, OnInit } from '@angular/core';

import { faHome, faUserFriends, faFlag, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
