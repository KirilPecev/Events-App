import { Component, OnInit } from '@angular/core';

import { faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-pictures',
  templateUrl: './user-pictures.component.html',
  styleUrls: ['./user-pictures.component.css']
})
export class UserPicturesComponent implements OnInit {
  faImages = faImages;

  constructor() { }

  ngOnInit(): void {
  }

}
