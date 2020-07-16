import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { User } from "src/app/core/models/user-model";
import { map } from "rxjs/operators";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  option = new FormControl();
  filteredOptions: Observable<Array<User>>;

  private allData: Array<User>;

  faSearch = faSearch;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.filteredOptions = this.option.valueChanges.pipe(
      map((value) => this.fetch(value))
    );
  }

  fetch(value: string) {
    this.userService.getAllUsers().subscribe((data) => {
      this.allData = data.filter((x) =>
        x.fullName.toLowerCase().includes(value.toLowerCase())
      );
    });

    return this.allData;
  }

  load() {
    const id = this.option.value;
    this.option.setValue("");
    this.router.navigate(["/profile", id]);
  }
}
