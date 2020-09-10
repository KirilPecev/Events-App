import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { passwordMatch } from "src/app/shared/validators";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/validation-constants";
import { Profile } from "src/app/core/message-constants";

@Component({
  selector: "app-security-settings",
  templateUrl: "./security-settings.component.html",
  styleUrls: ["./security-settings.component.css"],
})
export class SecuritySettingsComponent implements OnInit {
  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.emailForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.passwordForm = fb.group({
      passwords: fb.group(
        {
          currentPassword: ["", [Validators.required]],
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(User.PASSWORD_MIN_LENGTH),
            ],
          ],
          confirmPassword: ["", [Validators.required]],
        },
        { validators: [passwordMatch] }
      ),
    });
  }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation() {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.userService.getUserInformation(userId).subscribe((data) => {
      this.emailForm.patchValue({ email: data.email });
    });
  }

  changeEmail() {
    const email = this.emailForm.value["email"];
    this.userService.changeEmail(email).subscribe((data) => {
      this.toastrService.success(Profile.SUCCESSFULL_UPDATE);
    });
  }

  changePassword() {
    const currentPassword = this.passwordForm.value["passwords"].currentPassword;
    const newPassword = this.passwordForm.value["passwords"].password;

    this.userService
      .changePassword(currentPassword, newPassword)
      .subscribe((data) => {
        this.toastrService.success(Profile.SUCCESSFULL_UPDATE);
      });
  }
}
