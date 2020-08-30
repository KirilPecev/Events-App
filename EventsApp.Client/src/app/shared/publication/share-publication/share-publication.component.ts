import { Component, OnInit, Output } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PictureService } from "src/app/core/services/picture.service";
import { UserService } from "src/app/core/services/user.service";
import { finalize } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Post } from "src/app/core/message-constants";
import { Publication } from "src/app/core/validation-constants";
import { error } from "console";

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
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.publicationForm = fb.group({
      description: [
        "",
        [Validators.maxLength(Publication.DESCRIPTION_MAX_LENGTH)],
      ],
    });
  }

  imgURL: any;

  ngOnInit(): void {}

  share(input: HTMLInputElement) {
    var data: any = {
      description: this.publicationForm.value["description"],
    };

    const file = input.files[0];
    if (file) {
      const userId = this.userService.getUserId();
      const a = this.pictureService.uploadPublicationPic(file, userId);

      a.task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = a.fileRef.getDownloadURL();
          downloadURL.subscribe((url) => {
            data.imageUrl = url;
            this.sharePost(data);
          });
        })
      );
    } else {
      this.sharePost(data);
    }
  }

  private sharePost(data) {
    this.publicationService.create(data).subscribe(
      (data) => {
        this.toastrService.success(Post.SUCCESSFULL_CREATE);
        this.publicationForm.reset();
        this.imgURL = "";
      },
      (error) => {
        this.toastrService.error(Post.ERROR_400);
      }
    );
  }

  upload(files) {
    var reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
