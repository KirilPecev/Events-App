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
  constructor(private positionService: PositionService) {}

  availablePositions$: Observable<Array<Position>>;
  busyPositions$: Observable<Array<Position>>;

  ngOnInit(): void {
    this.availablePositions$ = this.positionService.getAvailablePositions(this.eventId);
    this.busyPositions$ = this.positionService.getBusyPositions(this.eventId);
  }

  join(id){

  }

  quit(id){
    
  }
}
