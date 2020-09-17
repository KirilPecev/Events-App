import { Component, OnInit, Input } from "@angular/core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-user-information",
  templateUrl: "./user-information.component.html",
  styleUrls: ["./user-information.component.css"],
})
export class UserInformationComponent implements OnInit {
  faUser = faUser;
  screenWidth: number;

  constructor() {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }
}
