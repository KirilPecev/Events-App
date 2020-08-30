import { Component, OnInit } from "@angular/core";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faFacebookF = faFacebookF;
  faGoogle = faGoogle;
  faTwitter = faTwitter;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}
  serverError: boolean = false;

  login(data) {
    this.userService.login(data.value.email, data.value.password).subscribe(
      (data) => {
        this.userService.saveToken(data["token"]);
        this.userService.saveUserInfo(data["userId"], data["fullName"]);
        this.router.navigate(["feed"]);
      },
      (error) => {
        if (error.status === 401) {
          this.serverError = true;
        }
      }
    );
  }
}
