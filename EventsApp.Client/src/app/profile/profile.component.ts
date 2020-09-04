import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { User } from "../core/models/user-model";
import { tap, finalize } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { PictureService } from "../core/services/picture.service";
import { Profile } from "../core/message-constants";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, DoCheck {
  createdEventsByUser$: Observable<any>;
  user$: Observable<User>;
  userId: string;
  isMyProfile: boolean;
  isMyFriend: boolean;
  isSentFriendRequest: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngDoCheck() {
    this.check();
  }

  check(): void {
    if (this.userId != this.route.snapshot.pathFromRoot[2].params["userId"]) {
      this.fetch();
    }
  }

  fetch() {
    const userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.userId = userId;

    this.user$ = this.userService.getUserInformation(userId).pipe(
      tap((data) => {
        this.isMyFriend = data.isMyFriend;
        this.isSentFriendRequest = data.isSentFriendRequest;
      })
    );

    this.createdEventsByUser$ = this.userService.getCreatedEventsAmount(
      this.userId
    );

    this.isMyProfile = this.userId === this.userService.getUserId();
  }

  upload(input: HTMLInputElement) {
    const file = input.files[0];

    if (file) {
      const userId = this.userService.getUserId();
      const result = this.pictureService.uploadProfilePic(file, userId);
      console.log(result.fileRef);

      result.task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = result.fileRef.getDownloadURL();
          downloadURL.subscribe((url) => {
            console.log(url);

            this.update(url);
          });
        })
      );
    }
  }

  private update(pictureUrl: string) {
    this.userService.updateProfilePicture(pictureUrl).subscribe(
      (data) => {
        this.toastrService.success(Profile.SUCCESSFULL_UPLOAD);
      },
      (error) => {
        this.toastrService.error(Profile.ERROR_400);
      }
    );
  }
}
