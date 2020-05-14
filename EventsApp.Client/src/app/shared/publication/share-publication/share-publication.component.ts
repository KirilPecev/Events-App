import { Component, OnInit } from "@angular/core";
import { PublicationService } from "src/app/core/services/publication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-share-publication",
  templateUrl: "./share-publication.component.html",
  styleUrls: ["./share-publication.component.css"],
})
export class SharePublicationComponent implements OnInit {
  publicationForm: FormGroup;

  constructor(fb: FormBuilder, private publicationService: PublicationService, private router: Router) {
    this.publicationForm = fb.group({
      description: [""],
    });
  }

  ngOnInit(): void {}

  share() {
    var data: any = {
      description: this.publicationForm.value["description"],
    };
    this.publicationService.create(data).subscribe((data) => {
      this.publicationForm.reset();
      this.router.navigate(["dashboard"]);
    });
  }
}
