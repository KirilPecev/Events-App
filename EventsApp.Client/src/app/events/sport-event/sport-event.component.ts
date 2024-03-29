import { Component, OnInit } from "@angular/core";
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormArray,
  UntypedFormControl,
} from "@angular/forms";
import { dateTimeValidator } from "../../shared/validators";
import { EventService } from "src/app/core/services/event.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Event } from "src/app/core/message-constants";
import { Event as EventConstants, Position } from "src/app/core/validation-constants";

@Component({
  selector: "app-sport-event",
  templateUrl: "./sport-event.component.html",
  styleUrls: ["./sport-event.component.css"],
})
export class SportEventComponent implements OnInit {
  eventForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
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
      positions: fb.array([]),
    });
  }

  addPosition() {
    const position = this.fb.group({
      position: [
        "",
        [
          Validators.required,
          Validators.minLength(Position.TITLE_MIN_LENGTH),
          Validators.maxLength(Position.TITLE_MAX_LENGTH),
        ],
      ],
    });

    this.positionForms.push(position);
  }

  get positionForms() {
    return this.eventForm.get("positions") as UntypedFormArray;
  }

  get position() {
    return this.positionForms.get("position") as UntypedFormControl;
  }

  create() {
    var data: any = {
      name: this.eventForm.value["name"],
      location: this.eventForm.value["location"],
      sport: this.eventForm.value["sport"],
      dateTime: this.eventForm.value["dateTime"],
      positions: this.eventForm.value["positions"].map((x) => x.position),
      isSportEvent: true,
    };

    this.eventService.create(data).subscribe((data) => {
      this.toastrService.success(Event.SUCCESSFULL_CREATE);
      this.eventForm.reset();
      this.router.navigate(["dashboard"]);
    });
  }

  ngOnInit(): void {}
}
