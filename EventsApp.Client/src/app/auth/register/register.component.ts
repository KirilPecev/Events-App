import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { passwordMatch } from "../../shared/validators";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";
import { Gender } from 'src/app/core/models/gender-enum';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  genders: any[];

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      birthday: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      passwords: fb.group(
        {
          password: ["", [Validators.required, Validators.minLength(6)]],
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
    }
    this.userService.register(data).subscribe((data) => {
      this.router.navigate(["login"]);
      this.registerForm.reset();
    });
  }

  ngOnInit(): void {
    const options = Object.keys(Gender);
    this.genders = options.slice(options.length / 2);
  }
}
