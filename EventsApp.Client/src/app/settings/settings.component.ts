import { Component, OnInit } from "@angular/core";
import { faCog, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  faCog = faCog;
  faShieldAlt = faShieldAlt;
  constructor() {}

  ngOnInit(): void {}
}
