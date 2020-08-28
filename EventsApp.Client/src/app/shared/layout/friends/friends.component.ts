import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { Observable } from "rxjs";
import { Friend } from "src/app/core/models/friend-model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Array<Friend>>;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
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
      this.createNotification(friendId);
    });
  }

  private createNotification(friendId: string) {
    const data = {
      description: `${this.userService.getUserFullName()} is now a friend`,
      userId: friendId,
    };

    this.notificationService.create(data).subscribe();
  }

  remove(friendId: string) {
    this.userService.removeFriendship(friendId).subscribe((data) => {
      this.fetch();
    });
  }
}
