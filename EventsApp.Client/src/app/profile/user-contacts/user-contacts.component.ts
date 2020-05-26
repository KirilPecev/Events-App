import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../../core/models/user-model";
import { UserService } from "../../core/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-user-contacts",
  templateUrl: "./user-contacts.component.html",
  styleUrls: ["./user-contacts.component.css"],
})
export class UserContactsComponent implements OnInit {
  editForm: FormGroup;
  contacts$: Observable<User>;
  isMyProfile: boolean;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.editForm = fb.group({
      mobile: ["", [Validators.minLength(2)]],
      facebookUrl: ["", [Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation() {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.isMyProfile = this.userService.getUserId() === userId;
    this.contacts$ = this.userService.getUserInformation(userId).pipe(
      tap((data) => {
        this.editForm.patchValue(data);
      })
    );
  }

  edit() {
    var data: any = {
      mobile: this.editForm.value["mobile"],
      facebookUrl: this.editForm.value["facebookUrl"],
    };

    this.userService.update(data).subscribe((data) => {});
  }
}
