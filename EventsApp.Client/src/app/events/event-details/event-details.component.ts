import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "src/app/core/models/event-model";
import { EventService } from "src/app/core/services/event.service";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";
import { dateTimeValidator } from "src/app/shared/validators";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"],
})
export class EventDetailsComponent implements OnInit {
  event$: Observable<Event>;
  userId: string;
  editForm: FormGroup;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    this.editForm = fb.group({
      id: ["", [Validators.required]],
      location: ["", [Validators.required]],
      dateTime: ["", [Validators.required, dateTimeValidator]],
    });
  }

  dateTime: Date;
  eventId: number;
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    const id = this.route.snapshot.paramMap.get("id");
    this.userId = this.userService.getUserId();

    this.event$ = this.eventService.getDetails(id).pipe(
      tap((data) => {
        this.eventId = data.id;
        this.dateTime = new Date(data.dateTime);
        this.editForm.patchValue(data);
      })
    );
  }

  edit() {
    var data: any = {
      id: this.eventId,
      location: this.editForm.value["location"],
      dateTime: this.editForm.value["dateTime"],
    };

    this.eventService.edit(data).subscribe((data) => {
      this.fetchData();
    });
  }

  deleteEvent() {
    this.eventService.delete(this.eventId).subscribe((data) => {
      this.router.navigate(["dashboard"]);
    });
  }
}
