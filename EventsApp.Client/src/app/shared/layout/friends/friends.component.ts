import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { Observable } from "rxjs";
import { Friend } from "src/app/core/models/friend-model";
import { NotificationService } from "src/app/core/services/notification.service";
import { Output, EventEmitter } from "@angular/core";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Array<Friend>>;
  @Output() friendsCount = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    this.friends$ = this.userService.getPendingFriends().pipe(
      tap((data) => {
        this.friendsCount.emit(data.length);
      })
    );
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
