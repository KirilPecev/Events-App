import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { dateTimeValidator } from "../../shared/validators";
import { EventService } from "src/app/core/services/event.service";
import { Router } from "@angular/router";

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
    private router: Router
  ) {
    this.eventForm = fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      location: ["", [Validators.required]],
      sport: ["", [Validators.required]],
      dateTime: ["", [Validators.required, dateTimeValidator]],
      availablePositions: ["", [Validators.required, Validators.min(1)]],
    });
  }

  create() {
    var data: any = {
      name: this.eventForm.value["name"],
      location: this.eventForm.value["location"],
      sport:this.eventForm.value["sport"],
      dateTime: this.eventForm.value["dateTime"],
      positions: Array<string>(this.eventForm.value["availablePositions"]),
      isSportEvent: false
    };

    this.eventService.create(data).subscribe((data) => {
      this.eventForm.reset();
      this.router.navigate(["dashboard"]);
    });
  }

  ngOnInit(): void {}
}
