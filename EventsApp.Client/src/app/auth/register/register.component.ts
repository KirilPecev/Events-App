import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { passwordMatch } from "../../shared/validators";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
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
      password: this.registerForm.value["passwords"].password,
    }
    console.log(data);
    this.userService.register(data).subscribe((data) => {
      this.router.navigate(["login"]);
      this.registerForm.reset();
    });
  }

  ngOnInit(): void {}
}
