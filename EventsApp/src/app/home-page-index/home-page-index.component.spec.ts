import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageIndexComponent } from './home-page-index.component';

describe('HomePageIndexComponent', () => {
  let component: HomePageIndexComponent;
  let fixture: ComponentFixture<HomePageIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
