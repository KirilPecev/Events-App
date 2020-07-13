import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {Event} from "src/app/core/models/event-model";
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css', '../styles.css']
})
export class UpcomingEventsComponent implements OnInit {

  events$: Observable<Array<Event>>;
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(){
    this.events$ = this.eventService.getUpcomingevents();
  }
}
