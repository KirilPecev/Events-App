import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-home-page-index',
  templateUrl: './home-page-index.component.html',
  styleUrls: ['./home-page-index.component.css']
})
export class HomePageIndexComponent implements OnInit {

  @ViewChildren("r") rs: QueryList<any>;

  constructor() { }

  show() {
    let index = 0;
    let arr = this.rs.toArray();
    setInterval(() => {
      if (index > 2) {
        index = 0;
      }
      arr[index].nativeElement.checked = true;
      index++;
    }, 4000);
  }

  ngAfterViewInit(): void {
    this.show();
  }

  ngOnInit(): void {
  }
}
