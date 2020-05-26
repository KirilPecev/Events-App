import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../core/models/user-model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../core/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-user-basic-information",
  templateUrl: "./user-basic-information.component.html",
  styleUrls: ["./user-basic-information.component.css"],
})
export class UserBasicInformationComponent implements OnInit {
  information$: Observable<User>;
  editForm: FormGroup;
  isMyProfile: boolean;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.editForm = fb.group({
      birthday: ["", [Validators.minLength(2)]],
      gender: ["", [Validators.minLength(2)]],
      favoriteSport: ["", [Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation() {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.isMyProfile = this.userService.getUserId() === userId;
    this.information$ = this.userService
      .getUserInformation(userId)
      .pipe(tap(data => {
        this.editForm.patchValue(data);
      }));
  }

  edit() {
    var data: any = {
      birthday: this.editForm.value["birthday"],
      gender: this.editForm.value["gender"],
      favoriteSport: this.editForm.value["favoriteSport"],
    };

    this.userService.update(data).subscribe((data) => {});
  }
}
