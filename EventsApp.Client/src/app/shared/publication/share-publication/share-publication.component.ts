import { Component, OnInit, Output } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PictureService } from "src/app/core/services/picture.service";
import { UserService } from "src/app/core/services/user.service";
import { finalize } from "rxjs/operators";
@Component({
  selector: "app-share-publication",
  templateUrl: "./share-publication.component.html",
  styleUrls: ["./share-publication.component.css"],
})
export class SharePublicationComponent implements OnInit {
  publicationForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private publicationService: PublicationService,
    private pictureService: PictureService,
    private userService: UserService
  ) {
    this.publicationForm = fb.group({
      description: [""],
    });
  }

  ngOnInit(): void {}

  share(input: HTMLInputElement) {
    var data: any = {
      description: this.publicationForm.value["description"],
    };

    const file = input.files[0];
    if (file) {
      const userId = this.userService.getUserId();
      const a = this.pictureService.uploadPublicationPic(file, userId);

      a.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            const downloadURL = a.fileRef.getDownloadURL();
            downloadURL.subscribe((url) => {
              data.imageUrl = url;
              this.sharePost(data);
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    } else {
      this.sharePost(data);
    }
  }

  private sharePost(data) {
    this.publicationService.create(data).subscribe((data) => {
      this.publicationForm.reset();
    });
  }
}
