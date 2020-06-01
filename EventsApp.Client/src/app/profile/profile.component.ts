import { Component, OnInit, OnChanges, DoCheck } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { User } from "../core/models/user-model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, DoCheck {
  createdEventsByUser$: Observable<any>;
  user$: Observable<User>;
  userId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.user$ = this.userService.getUserInformation(this.userId);
    this.createdEventsByUser$ = this.userService.getCreatedEventsAmount(this.userId);
  }

  ngDoCheck(){
    this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    console.log(this.userId + "from profile");
  }
}
