import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "src/app/core/models/event-model";
import { EventService } from "src/app/core/services/event.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-upcoming-events",
  templateUrl: "./upcoming-events.component.html",
  styleUrls: ["./upcoming-events.component.css", "../styles.css"],
})
export class UpcomingEventsComponent implements OnInit {
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
    this.events$ = this.eventService.getUpcomingevents();
  }
}
