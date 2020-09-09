import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user-model";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User as UserVC } from 'src/app/core/validation-constants';
import { formatDate } from '@angular/common';

@Component({
  selector: "app-general-settings",
  templateUrl: "./general-settings.component.html",
  styleUrls: ["./general-settings.component.css"],
})
export class GeneralSettingsComponent implements OnInit {
  editForm: FormGroup;
  user$: Observable<User>;
  isDeactivated: boolean;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.editForm = fb.group({
      firstName: ["",[Validators.required, Validators.minLength(UserVC.FIRST_NAME_MIN_LENGTH), Validators.maxLength(UserVC.FIRST_NAME_MAX_LENGTH)]],
      lastName: ["", [Validators.required, Validators.minLength(UserVC.LAST_NAME_MIN_LENGTH), Validators.maxLength(UserVC.LAST_NAME_MAX_LENGTH)]],
      mobile: ["", [Validators.minLength(UserVC.MOBILE_MIN_LENGTH), Validators.maxLength(UserVC.MOBILE_MAX_LENGTH)]],
      facebookUrl: ["", [Validators.minLength(UserVC.FACEBOOK_URL_MIN_LENGTH)]],
      birthday: [""],
      favoriteSport: [""],
    });
  }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation() {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.userService.getUserInformation(userId).subscribe((data) => {
      this.isDeactivated = data.isDeactivated;
      data.birthday = formatDate(data.birthday, "yyyy-MM-dd", "en_US");
      this.editForm.patchValue(data);
    });
  }

  edit() {
    var data: any = {
      firstName: this.editForm.value["firstName"],
      lastName: this.editForm.value["lastName"],
      mobile: this.editForm.value["mobile"],
      facebookUrl: this.editForm.value["facebookUrl"],
      birthday: this.editForm.value["birthday"],
      sport: this.editForm.value["favoriteSport"],
    };

    this.userService.update(data).subscribe((data) => {});
  }

  deactivateAcc(){

  }

  deleteAcc(){

  }
}
