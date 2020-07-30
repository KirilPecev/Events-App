import { Component, OnInit, DoCheck } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-user-daybook",
  templateUrl: "./user-daybook.component.html",
  styleUrls: ["./user-daybook.component.css"],
})
export class UserDaybookComponent implements OnInit, DoCheck {
  userId: string;
  isMyProfile: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    this.isMyProfile =
      this.route.snapshot.pathFromRoot[2].params["userId"] ===
      this.userService.getUserId();
  }
}
