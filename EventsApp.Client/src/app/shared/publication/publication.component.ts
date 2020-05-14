import { Component, OnInit } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";
import { Publication } from "src/app/core/models/publication-model";
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
      this.fetchMinePublications();
    }
  }

  fetchPublications() {
    this.publications$ = this.publicationService.getPublications();
  }

  fetchMinePublications() {
    this.publications$ = this.publicationService.getMinePublications();
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
}
