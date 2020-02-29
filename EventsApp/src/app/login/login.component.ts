import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  constructor() { }

  ngOnInit(): void {
  }

}
