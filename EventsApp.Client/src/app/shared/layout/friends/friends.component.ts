import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { Observable } from "rxjs";
import { Friend } from "src/app/core/models/friend-model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Array<Friend>>;
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

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
