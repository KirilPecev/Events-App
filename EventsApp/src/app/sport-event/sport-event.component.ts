import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sport-event',
  templateUrl: './sport-event.component.html',
  styleUrls: ['./sport-event.component.css']
})
export class SportEventComponent implements OnInit {
  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  locationFormControl = new FormControl('', [
    Validators.required
  ]);

  sportFormControl = new FormControl('', [
    Validators.required
  ]);

  timeFormControl = new FormControl('', [
    Validators.required
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  availablePositionsFormControl = new FormControl('', [
    Validators.required
  ]);

  positionFormControl = new FormControl('', [
    Validators.required
  ]);

  positions: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
