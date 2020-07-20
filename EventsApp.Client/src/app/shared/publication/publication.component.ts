import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../../core/services/publication.service";
import { Publication } from "../../core/models/publication-model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  publications$: Observable<Array<Publication>>;
  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    if (this.route.outlet === "dashboard") {
      this.fetchPublications();
    } else {
      this.fetchByUser();
    }
  }

  fetchPublications() {
    this.publications$ = this.publicationService.getPublications();
  }

  fetchByUser() {
    let userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.publications$ = this.publicationService.getPublicationsByUser(userId);
  }

  like(id) {
    this.publicationService.like(id).subscribe((data) => {
      this.fetch();
    });
  }

  unlike(id) {
    this.publicationService.unlike(id).subscribe((data) => {
      this.fetch();
    });
  }

  share(id) {
    this.publicationService.share(id).subscribe((data) => {
      this.fetch();
    });
  }

  deletePublication(id: number) {
    this.publicationService.delete(id, false).subscribe((data) => {
      this.fetch();
    });
  }

  deleteSharedPublication(id: number) {
    this.publicationService.delete(id, true).subscribe((data) => {
      this.fetch();
    });
  }
}
