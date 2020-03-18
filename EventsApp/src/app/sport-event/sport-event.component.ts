import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sport-event',
  templateUrl: './sport-event.component.html',
  styleUrls: ['./sport-event.component.css']
})
export class SportEventComponent implements OnInit {

  eventForm: FormGroup
  positions: number = 0;

  constructor(fb: FormBuilder) {
    this.eventForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required]],
      sport: ['', [Validators.required]],
      time: ['', [Validators.required]],
      date: ['', [Validators.required]],
      availablePositions: ['', [Validators.required, Validators.min(1)]],
      position: ['', [Validators.required]]
    });
  }

  create() {
    console.log(this.eventForm.value);
    this.eventForm.reset();
  }

  ngOnInit(): void {
  }

}
