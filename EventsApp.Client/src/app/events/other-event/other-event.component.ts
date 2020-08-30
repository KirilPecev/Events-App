import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { dateTimeValidator } from "../../shared/validators";
import { EventService } from "src/app/core/services/event.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Event } from "src/app/core/message-constants";
import { Event as EventConstants } from "src/app/core/validation-constants";

@Component({
  selector: "app-other-event",
  templateUrl: "./other-event.component.html",
  styleUrls: ["./other-event.component.css"],
})
export class OtherEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.eventForm = fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(EventConstants.TITLE_MIN_LENGTH),
          Validators.maxLength(EventConstants.TITLE_MAX_LENGTH),
        ],
      ],
      location: [
        "",
        [
          Validators.required,
          Validators.minLength(EventConstants.LOCATION_MIN_LENGTH),
        ],
      ],
      sport: [
        "",
        [
          Validators.required,
          Validators.minLength(EventConstants.SPORT_MIN_LENGTH),
          Validators.maxLength(EventConstants.SPORT_MAX_LENGTH),
        ],
      ],
      dateTime: ["", [Validators.required, dateTimeValidator]],
      availablePositions: [
        "",
        [
          Validators.required,
          Validators.min(EventConstants.AVAILABLE_POSITIONS_MIN_LENGTH),
        ],
      ],
    });
  }

  create() {
    var data: any = {
      name: this.eventForm.value["name"],
      location: this.eventForm.value["location"],
      sport: this.eventForm.value["sport"],
      dateTime: this.eventForm.value["dateTime"],
      positions: Array<string>(this.eventForm.value["availablePositions"]),
      isSportEvent: false,
    };

    this.eventService.create(data).subscribe((data) => {
      this.toastrService.success(Event.SUCCESSFULL_CREATE);
      this.eventForm.reset();
      this.router.navigate(["dashboard"]);
    });
  }

  ngOnInit(): void {}
}
