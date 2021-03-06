import { Component, OnInit } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isLoggedIn) {
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit(): void {}
}
