import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "src/app/core/models/event-model";
import { EventService } from "src/app/core/services/event.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"],
})
export class EventDetailsComponent implements OnInit {
  event$: Observable<Event>;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.event$ = this.eventService.getDetails(id);
  }
}
