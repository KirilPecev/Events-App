import { Component, OnInit, OnChanges, DoCheck } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { User } from "../core/models/user-model";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, DoCheck {
  createdEventsByUser$: Observable<any>;
  user$: Observable<User>;
  userId: string;
  isMyProfile: boolean;
  isMyFriend: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngDoCheck() {
    this.check();
  }

  check(): void {
    if (this.userId != this.route.snapshot.pathFromRoot[2].params["userId"]) {
      this.fetch();
    }
  }

  fetch() {
    const userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.userId = userId;

    this.user$ = this.userService.getUserInformation(userId).pipe(
      tap((data) => {
        this.isMyFriend = data.isMyFriend;
      })
    );

    this.createdEventsByUser$ = this.userService.getCreatedEventsAmount(
      this.userId
    );

    this.isMyProfile = this.userId === this.userService.getUserId();
  }
}
