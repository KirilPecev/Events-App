import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-photo-modal",
  templateUrl: "./photo-modal.component.html",
  styleUrls: ["./photo-modal.component.css"],
})
export class PhotoModalComponent implements OnInit {
  @Input() imgUrl: string;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.isClosed.emit(true);
  }
}
