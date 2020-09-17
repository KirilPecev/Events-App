import { Component, OnInit } from "@angular/core";
import { faCog, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "../core/services/user.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  faCog = faCog;
  faShieldAlt = faShieldAlt;
  userId: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }
}
