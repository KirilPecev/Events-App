import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user-model";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User as UserVC } from "src/app/core/validation-constants";
import { formatDate } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Profile } from "src/app/core/message-constants";

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
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.editForm = fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(UserVC.FIRST_NAME_MIN_LENGTH),
          Validators.maxLength(UserVC.FIRST_NAME_MAX_LENGTH),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(UserVC.LAST_NAME_MIN_LENGTH),
          Validators.maxLength(UserVC.LAST_NAME_MAX_LENGTH),
        ],
      ],
      mobile: [
        "",
        [
          Validators.minLength(UserVC.MOBILE_MIN_LENGTH),
          Validators.maxLength(UserVC.MOBILE_MAX_LENGTH),
        ],
      ],
      facebookUrl: ["", [Validators.minLength(UserVC.FACEBOOK_URL_MIN_LENGTH)]],
      birthday: ["", [Validators.required]],
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

    this.userService.update(data).subscribe((data) => {
      this.toastrService.success(Profile.SUCCESSFULL_UPDATE);
    });
  }

  deactivateAcc() {
    this.userService.deactivateAccount().subscribe((data) => {
      this.toastrService.success(Profile.SUCCESSFULL_DEACTIVATE);
      this.getInformation();
    });
  }

  deleteAcc() {
    this.userService.deleteAccount().subscribe((data) => {
      this.toastrService.success(Profile.SUCCESSFULL_DELETE);
      this.userService.logout();
      this.router.navigate([""]);
    });
  }
}
