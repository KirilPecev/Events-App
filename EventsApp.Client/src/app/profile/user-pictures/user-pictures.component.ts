import { Component, OnInit } from "@angular/core";

import { faImages } from "@fortawesome/free-solid-svg-icons";

import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { ArrayDataSource } from "@angular/cdk/collections";
import { promise } from "protractor";

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
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.fetch();
  }

  fetch() {
    const storageRef = this.storage.ref(`users/${this.userId}`);

    let map = [];

    storageRef.listAll().subscribe((data) => {
      data.items.forEach((x) => {
        x.getMetadata().then((a) => {
          x.getDownloadURL()
            .then((b) => {
              map.push({
                url: b,
                date: new Date(a.updated),
              });
              map = map.sort((a, b) => {
                return a.date - b.date;
              });
            })
            .then((x) => {
              this.images = map;
            });
        });
      });
    });
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
    const task = this.storage
      .upload(`users/${this.userId}/${title}`, file)
      .then((x) => {
        this.fetch();
      });

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
