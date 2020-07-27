import { Component, OnInit } from "@angular/core";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { PictureService } from "src/app/core/services/picture.service";

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
    private pictureService: PictureService
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
      this.fetch();
    });
  }
}
