import { Component, OnInit } from "@angular/core";
import { EventService } from "../core/services/event.service";
import { Observable } from "rxjs";
import { Event } from "../core/models/event-model";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  events$: Observable<Array<Event>>;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.events$ = this.eventService.getEvents();
  }
}
