import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  login(data) {
    this.userService.login(data.value.email, data.value.password)
      .subscribe(() => {
        this.router.navigate(['feed']);
        data.reset();
      });
  }
}
