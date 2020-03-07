import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-other-event',
  templateUrl: './other-event.component.html',
  styleUrls: ['./other-event.component.css']
})
export class OtherEventComponent implements OnInit {

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


  constructor() { }

  ngOnInit(): void {
  }

}
