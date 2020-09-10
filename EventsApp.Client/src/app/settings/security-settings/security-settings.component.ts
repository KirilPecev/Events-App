import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { passwordMatch } from "src/app/shared/validators";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/validation-constants";

@Component({
  selector: "app-security-settings",
  templateUrl: "./security-settings.component.html",
  styleUrls: ["./security-settings.component.css"],
})
export class SecuritySettingsComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.editForm = fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(User.FIRST_NAME_MIN_LENGTH),
          Validators.maxLength(User.FIRST_NAME_MAX_LENGTH),
        ],
      ],
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

  ngOnInit(): void {}

  edit(){

  }
}
