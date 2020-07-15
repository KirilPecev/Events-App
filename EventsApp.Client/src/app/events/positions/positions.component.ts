import { Component, OnInit, Input } from "@angular/core";
import { PositionService } from "../../core/services/position.service";
import { Observable } from "rxjs";
import { Position } from "../../core/models/position-model";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.css"],
})
export class PositionsComponent implements OnInit {
  @Input() eventId: number;
  @Input() isSportEvent: boolean;
  @Input() isUserJoined: boolean;

  constructor(private positionService: PositionService) {}

  availablePositions: Array<Position>;
  availablePositionsCount = 0;

  busyPositions$: Observable<Array<Position>>;

  ngOnInit(): void {
    this.fetch(); 
  }

  fetch() {
    this.positionService.getAvailablePositions(this.eventId).subscribe(data => {
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
    });
  }

  quit(id) {
    let data = {
      eventId: this.eventId,
      positionId: id,
    };

    this.positionService.unjoin(data).subscribe((data) => {
      this.fetch();
    });
  }

  joinToOtherKindEvent(){
    let data = {
      eventId: this.eventId,
    };

    this.positionService.join(data).subscribe((data) => {
      this.fetch();
      this.isUserJoined = true;
    });
  }

  quitFromOtherKindEvent(){
    let data = {
      eventId: this.eventId,
    };

    this.positionService.unjoin(data).subscribe((data) => {
      this.fetch();
      this.isUserJoined = false;
    });
  }
}
