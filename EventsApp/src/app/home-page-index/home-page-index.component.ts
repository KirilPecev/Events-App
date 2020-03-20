import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page-index',
  templateUrl: './home-page-index.component.html',
  styleUrls: ['./home-page-index.component.css']
})
export class HomePageIndexComponent implements OnInit {

  @ViewChildren("r") rs: QueryList<any>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if (this.isLoggedIn) {
      this.router.navigate(["/feed"]); //TODO: Use guard
    }
  }

  isLoggedIn = this.userService.isLoggedIn;

  show() {
    let index = 0;
    let arr = this.rs.toArray();
    setInterval(() => {
      if (index > 2) {
        index = 0;
      }
      arr[index].nativeElement.checked = true;
      index++;
    }, 4000);
  }

  ngAfterViewInit(): void {
    this.show();
  }

  ngOnInit(): void {
  }
}