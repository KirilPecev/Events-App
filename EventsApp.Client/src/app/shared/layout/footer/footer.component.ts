import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faInstagramSquare, faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faFacebookSquare = faFacebookSquare;
  faInstagramSquare = faInstagramSquare;
  faGithubSquare = faGithubSquare;
  faTwitterSquare = faTwitterSquare;

  constructor( private userService: UserService) { }

  isLoggedIn = () => this.userService.isLoggedIn();

  ngOnInit(): void {
  }

}
