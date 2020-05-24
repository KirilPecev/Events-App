import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../core/models/user-model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-basic-information',
  templateUrl: './user-basic-information.component.html',
  styleUrls: ['./user-basic-information.component.css']
})
export class UserBasicInformationComponent implements OnInit {

  information$: Observable<User>;
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.getInformation();
  }

  getInformation(){
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.information$ = this.userService.getUserInformation(userId);
  }
}
