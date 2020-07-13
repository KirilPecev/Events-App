import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Event} from "src/app/core/models/event-model";
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-mine-events',
  templateUrl: './mine-events.component.html',
  styleUrls: ['./mine-events.component.css']
})
export class MineEventsComponent implements OnInit {

  events$: Observable<Array<Event>>;
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(){
    this.events$ = this.eventService.getEvents();
  }
}
