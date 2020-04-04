import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePublicationComponent } from './share-publication.component';

describe('SharePublicationComponent', () => {
  let component: SharePublicationComponent;
  let fixture: ComponentFixture<SharePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
