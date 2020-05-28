import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  private fetch() {
    this.userService
      .getPendingFriends()
      .subscribe((data) => (this.data.friends = data));
  }

  accept(friendId: string) {
    this.userService.acceptFriendship(friendId).subscribe((data) => {
      this.fetch();
    });
  }

  remove(friendId: string) {
    this.userService.removeFriendship(friendId).subscribe((data) => {
      this.fetch();
    });
  }
}
