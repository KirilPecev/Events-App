import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { Friend } from 'src/app/core/models/friend-model';

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Array<Friend>>;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    this.friends$ = this.userService.getPendingFriends();
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
