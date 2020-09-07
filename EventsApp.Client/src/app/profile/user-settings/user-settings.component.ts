import { Component, OnInit } from "@angular/core";
import { faCog, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-user-settings",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.css"],
})
export class UserSettingsComponent implements OnInit {
  faCog = faCog;
  faShieldAlt = faShieldAlt;
  constructor() {}

  ngOnInit(): void {}
}
