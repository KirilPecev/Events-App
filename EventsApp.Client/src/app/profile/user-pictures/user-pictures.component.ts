import { Component, OnInit } from "@angular/core";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { PictureService } from "src/app/core/services/picture.service";
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/core/message-constants';

@Component({
  selector: "app-user-pictures",
  templateUrl: "./user-pictures.component.html",
  styleUrls: ["./user-pictures.component.css"],
})
export class UserPicturesComponent implements OnInit {
  faImages = faImages;
  userId: string;
  images: any[];

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.fetch();
  }

  fetch() {
    this.images = this.pictureService.getAllByUser(this.userId);
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    this.pictureService.upload(file, this.userId).then((data) => {
      this.toastrService.success(Profile.SUCCESSFULL_UPLOAD);
      this.fetch();
    });
  }
}
