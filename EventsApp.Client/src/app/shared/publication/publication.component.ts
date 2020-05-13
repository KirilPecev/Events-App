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
    this.publications$.subscribe(s=>{
      console.log(s);
    })
  }
}
