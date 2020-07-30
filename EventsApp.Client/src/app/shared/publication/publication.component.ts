import { Component, OnInit, DoCheck } from "@angular/core";
import { PublicationService } from "../../core/services/publication.service";
import { Publication } from "../../core/models/publication-model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit, DoCheck {
  publications$: Observable<Array<Publication>>;
  userId: string;

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngDoCheck(){
     if(this.route.snapshot.pathFromRoot[2].params["userId"] != this.userId){
       this.fetchByUser();
     }
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
   this.userId = this.route.snapshot.pathFromRoot[2].params["userId"];
    this.publications$ = this.publicationService.getPublicationsByUser(this.userId);
  }

  like(id, p) {
    this.publicationService.like(id).subscribe((data) => {
      p.likes++;
      p.isLiked = true;
    });
  }

  unlike(id, p) {
    this.publicationService.unlike(id).subscribe((data) => {
      p.likes--;
      p.isLiked = false;
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
}
