import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { Observable } from "rxjs";
import { Friend } from "../../../core/models/friend-model";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  pendingFriends$: Observable<Array<Friend>>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    let userId = this.userService.getUserId();
    this.pendingFriends$ = this.userService.getPendingFriends(userId);
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
