import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageFeedComponent } from './home-page-feed.component';

describe('HomePageFeedComponent', () => {
  let component: HomePageFeedComponent;
  let fixture: ComponentFixture<HomePageFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
