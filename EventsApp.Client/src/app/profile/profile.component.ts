import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  userId = this.userService.getUserId();
}
