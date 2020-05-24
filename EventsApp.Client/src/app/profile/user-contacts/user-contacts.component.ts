import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user-model';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.css']
})
export class UserContactsComponent implements OnInit {

  contacts$: Observable<User>;
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.getInformation();
  }

  getInformation(){
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.contacts$ = this.userService.getUserContacts(userId);
  }
}
