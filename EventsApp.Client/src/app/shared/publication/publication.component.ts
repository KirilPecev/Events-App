import { Component, OnInit, DoCheck } from "@angular/core";
import { PublicationService } from "../../core/services/publication.service";
import { Publication } from "../../core/models/publication-model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/core/message-constants';

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit, DoCheck {
  publications$: Observable<Array<Publication>>;
  userId: string;
  showModal: boolean;
  imgUrl: string;

  constructor(
    private publicationService: PublicationService,
    private notificationService: NotificationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngDoCheck() {
    if (this.route.snapshot.pathFromRoot[2].params["userId"] != this.userId) {
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
    this.publications$ = this.publicationService.getPublicationsByUser(
      this.userId
    );
  }

  like(publication) {
    this.publicationService.like(publication.id).subscribe((data) => {
      publication.likes++;
      publication.isLiked = true;
      this.createNotification(publication, "like");
    });
  }

  unlike(publication) {
    this.publicationService.unlike(publication.id).subscribe((data) => {
      publication.likes--;
      publication.isLiked = false;
    });
  }

  share(publication) {
    this.publicationService.share(publication.id).subscribe((data) => {
      this.toastrService.success(Post.SUCCESSFULL_CREATE);
      this.fetch();
      this.createNotification(publication, "share");
    });
  }

  deletePublication(id: number) {
    this.publicationService.delete(id, false).subscribe((data) => {
      this.toastrService.success(Post.SUCCESSFULL_DELETE);
      this.fetch();
    });
  }

  private createNotification(publication: Publication, action: string) {
    const data = {
      userId: publication.userId,
      description: `${this.userService.getUserFullName()} ${action} your post`,
      imageUrl: publication.imageUrl,
    };

    this.notificationService.create(data).subscribe();
  }

  open(imgUrl: string) {
    this.showModal = true;
    this.imgUrl = imgUrl;
  }

  close(event){
    this.showModal = !event;
  }
}
