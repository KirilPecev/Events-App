import { Component, OnInit } from "@angular/core";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { Friend } from "../../core/models/friend-model";
import { UserService } from "../../core/services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-friends",
  templateUrl: "./user-friends.component.html",
  styleUrls: ["./user-friends.component.css"],
})
export class UserFriendsComponent implements OnInit {
  friends$: Observable<Array<Friend>>;
  faUsers = faUsers;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.friends$ = this.userService.getFriends(userId);
  }
}
