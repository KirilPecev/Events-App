import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styleUrls: ["./left-sidebar.component.css"],
})
export class LeftSidebarComponent implements OnInit {
  profilePictureUrl: string;
  constructor(private userService: UserService) {}
  userId = this.userService.getUserId();

  ngOnInit(): void {
    this.userService.getUserInformation(this.userId).subscribe(
      (data) => {
        this.profilePictureUrl = data.profilePictureUrl;
      }
    );
  }
}
