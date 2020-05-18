import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.css"]
})
export class PositionsComponent implements OnInit {

  @Input() availablePositions: Array<string>;
  constructor() {}

  ngOnInit(): void {}
}
