import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { passwordMatch } from "../../shared/validators";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";
import { Gender } from "src/app/core/models/gender-enum";
import { PictureService } from "src/app/core/services/picture.service";
import { ToastrService } from "ngx-toastr";
import { Auth } from "src/app/core/message-constants";
import { User } from "src/app/core/validation-constants";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  genders: any[];

  constructor(
    fb: UntypedFormBuilder,
    private userService: UserService,
    private pictureService: PictureService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.registerForm = fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(User.FIRST_NAME_MIN_LENGTH),
          Validators.maxLength(User.FIRST_NAME_MAX_LENGTH),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(User.LAST_NAME_MIN_LENGTH),
          Validators.maxLength(User.LAST_NAME_MAX_LENGTH),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      birthday: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      passwords: fb.group(
        {
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

  register() {
    var data: any = {
      firstName: this.registerForm.value["firstName"],
      lastName: this.registerForm.value["lastName"],
      email: this.registerForm.value["email"],
      birthday: this.registerForm.value["birthday"],
      gender: this.registerForm.value["gender"],
      password: this.registerForm.value["passwords"].password,
    };

    data.profilePictureUrl = this.pictureService.getDefaultProfilePicture(
      data.gender
    );

    this.userService.register(data).subscribe((data) => {
      this.toastrService.success(Auth.SUCCESSFULL_REGISTER);
      this.router.navigate(["login"]);
      this.registerForm.reset();
    });
  }

  ngOnInit(): void {
    const options = Object.keys(Gender);
    this.genders = options.slice(options.length / 2);
  }
}
