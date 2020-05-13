import { Component, OnInit } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";

@Component({
  selector: "app-share-publication",
  templateUrl: "./share-publication.component.html",
  styleUrls: ["./share-publication.component.css"],
})
export class SharePublicationComponent implements OnInit {
  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {}
}
