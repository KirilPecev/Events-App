import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendButtonsComponent } from './user-friend-buttons.component';

describe('UserFriendButtonsComponent', () => {
  let component: UserFriendButtonsComponent;
  let fixture: ComponentFixture<UserFriendButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFriendButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
