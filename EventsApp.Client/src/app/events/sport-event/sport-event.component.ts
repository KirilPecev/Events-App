import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from "@angular/forms";
import { dateTimeValidator } from "../../shared/validators";
import { EventService } from "src/app/core/services/event.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/core/message-constants';

@Component({
  selector: "app-sport-event",
  templateUrl: "./sport-event.component.html",
  styleUrls: ["./sport-event.component.css"],
})
export class SportEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.eventForm = fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      location: ["", [Validators.required]],
      sport: ["", [Validators.required]],
      dateTime: ["", [Validators.required, dateTimeValidator]],
      positions: fb.array([]),
    });
  }

  addPosition() {
    const position = this.fb.group({
      position: ["", [Validators.required]],
    });

    this.positionForms.push(position);
  }

  get positionForms() {
    return this.eventForm.get("positions") as FormArray;
  }

  get position() {
    return this.positionForms.get("position") as FormControl;
  }

  create() {
    var data: any = {
      name: this.eventForm.value["name"],
      location: this.eventForm.value["location"],
      sport: this.eventForm.value["sport"],
      dateTime: this.eventForm.value["dateTime"],
      positions: this.eventForm.value["positions"].map((x) => x.position),
      isSportEvent: true
    };

    this.eventService.create(data).subscribe((data) => {
      this.toastrService.success(Event.SUCCESSFULL_CREATE);
      this.eventForm.reset();
      this.router.navigate(["dashboard"]);
    });
  }

  ngOnInit(): void {}
}
