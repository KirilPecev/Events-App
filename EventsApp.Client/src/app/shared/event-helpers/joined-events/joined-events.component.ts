import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "src/app/core/models/event-model";
import { EventService } from "src/app/core/services/event.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-joined-events",
  templateUrl: "./joined-events.component.html",
  styleUrls: ["./joined-events.component.css", "../styles.css"],
})
export class JoinedEventsComponent implements OnInit {
  events$: Observable<Array<Event>>;

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.fetch();
    }
  }

  fetch() {
    this.events$ = this.eventService.getEventsImJoined();
  }
}
