import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { dateTimeValidator } from '../../shared/validators';

@Component({
  selector: 'app-other-event',
  templateUrl: './other-event.component.html',
  styleUrls: ['./other-event.component.css']
})
export class OtherEventComponent implements OnInit {

  eventForm: FormGroup

  constructor(fb: FormBuilder) {
    this.eventForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required]],
      sport: ['', [Validators.required]],
      dateTime: ['', [Validators.required, dateTimeValidator]],
      availablePositions: ['', [Validators.required, Validators.min(1)]],
    });
  }

  create() {
    console.log(this.eventForm.value);
    this.eventForm.reset();
  }

  ngOnInit(): void {
  }

}
