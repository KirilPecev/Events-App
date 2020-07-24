import { Component, OnInit } from "@angular/core";

import { faImages } from "@fortawesome/free-solid-svg-icons";

import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-pictures",
  templateUrl: "./user-pictures.component.html",
  styleUrls: ["./user-pictures.component.css"],
})
export class UserPicturesComponent implements OnInit {
  faImages = faImages;
  userId: string;
  images: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.fetch();
  }

  fetch() {
    const storageRef = this.storage.ref(`users/${this.userId}`);

    storageRef.listAll().subscribe((data) => {
      data.items.map((x) =>
        x.getDownloadURL().then((x) => this.images.push(x))
      );
    });

    console.log(this.images)
  }

  selectedFile: File = null;
  downloadURL: Observable<string>;
  fb;
  onFileSelected(event) {
    var title = Date.now();
    const file = event.target.files[0];
    const filePath = `users/${this.userId}/${title}`;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    const task = this.storage.upload(`users/${this.userId}/kirilPecev`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe((url) => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //         console.log(this.fb);
    //       });
    //     })
    //   )
    //   .subscribe((url) => {
    //     if (url) {
    //       console.log(url);
    //     }
    //   });
  }
}
