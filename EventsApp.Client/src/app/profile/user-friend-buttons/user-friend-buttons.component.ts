import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-friend-buttons",
  templateUrl: "./user-friend-buttons.component.html",
  styleUrls: ["./user-friend-buttons.component.css"],
})
export class UserFriendButtonsComponent implements OnInit {
  @Input() userId: string;
  @Input() isMyFriend: boolean;
  @Input() isSentFriendRequest: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
  }

  add() {
    this.userService.addFriend(this.userId).subscribe((x) => {
      this.isSentFriendRequest = true;
    });
  }

  remove() {
    this.userService.removeFriendship(this.userId).subscribe();
  }
}
