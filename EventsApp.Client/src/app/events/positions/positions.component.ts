import { Component, OnInit, Input } from "@angular/core";
import { PositionService } from "../../core/services/position.service";
import { Observable } from "rxjs";
import { Position } from "../../core/models/position-model";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.css"],
})
export class PositionsComponent implements OnInit {
  @Input() eventId: number;
  @Input() isSportEvent: boolean;
  @Input() isUserJoined: boolean;
  @Input() creatorId: string;
  @Input() eventTitle: string;

  constructor(
    private positionService: PositionService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  availablePositions: Array<Position>;
  availablePositionsCount = 0;

  busyPositions$: Observable<Array<Position>>;

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.positionService
      .getAvailablePositions(this.eventId)
      .subscribe((data) => {
        this.availablePositions = data;
        this.availablePositionsCount = data.length;
      });
    this.busyPositions$ = this.positionService.getBusyPositions(this.eventId);
  }

  join(id) {
    let data = {
      eventId: this.eventId,
      positionId: id,
    };

    this.positionService.join(data).subscribe((data) => {
      this.fetch();
      this.createNotification(`${this.userService.getUserFullName()} join to`);
    });
  }

  private createNotification(description: string) {
    const dataN = {
      userId: this.creatorId,
      description: `${description} ${this.eventTitle}`,
    };

    this.notificationService.create(dataN).subscribe();
  }

  quit(id) {
    let data = {
      eventId: this.eventId,
      positionId: id,
    };

    this.positionService.unjoin(data).subscribe((data) => {
      this.fetch();
      this.createNotification(
        `${this.userService.getUserFullName()} quit from`
      );
    });
  }

  joinToOtherKindEvent() {
    let data = {
      eventId: this.eventId,
    };

    this.positionService.join(data).subscribe((data) => {
      this.fetch();
      this.isUserJoined = true;
    });

    this.createNotification(`${this.userService.getUserFullName()} join to`);
  }

  quitFromOtherKindEvent() {
    let data = {
      eventId: this.eventId,
    };

    this.positionService.unjoin(data).subscribe((data) => {
      this.fetch();
      this.isUserJoined = false;
    });

    this.createNotification(`${this.userService.getUserFullName()} quit from`);
  }
}
