import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PictureService {
  constructor(private storage: AngularFireStorage) {}

  getAllByUser(userId: string): any[] {
    const storageRef = this.storage.ref(`users/${userId}`);

    let map = [];

    storageRef.listAll().subscribe((data) => {
      data.items.forEach((x) => {
        x.getMetadata().then((a) => {
          x.getDownloadURL().then((b) => {
            map.push({
              url: b,
              date: new Date(a.updated),
            });
            map = map.sort((a, b) => {
              return a.date - b.date;
            });
          });
        });
      });
    });

    return map;
  }

  upload(file: any, userId: string): any {
    var title = Date.now();
    const filePath = `users/${userId}/${title}`;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    return this.storage.upload(`users/${userId}/${title}`, file);
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

  uploadProfilePic(file: any, userId: string): string {
    let downloadURL = "";
    var title = Date.now();
    const filePath = `users/${userId}/${title}`;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    const task = this.storage.upload(`users/${userId}/${title}`, file);

    task.snapshotChanges().subscribe((data) => {
      data.ref.getDownloadURL().then((url) => {
        downloadURL = url;
      });
    });

    //   .pipe(
    //     finalize(() => {
    //       const downloadURL = fileRef.getDownloadURL();
    //       downloadURL.subscribe((url) => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //       });
    //     })
    //   )
    //   .subscribe((url) => {
    //     if (url) {
    //       downloadURL = url;
    //     }
    //   });

    return downloadURL;
  }
}