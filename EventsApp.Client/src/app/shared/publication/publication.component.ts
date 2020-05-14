import { Component, OnInit } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";
import { Publication } from "src/app/core/models/publication-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  publications$: Observable<Array<Publication>>;
  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.publications$ = this.publicationService.getPublications();
  }

  like(id) {
    this.publicationService.like(id).subscribe((data) => {});
  }

  unlike(id) {
    this.publicationService.unlike(id).subscribe((data) => {});
  }

  share(id) {
    this.publicationService.share(id).subscribe((data) => {});
  }
}
