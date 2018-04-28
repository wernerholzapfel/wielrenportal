import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursetupComponent } from './toursetup.component';

describe('ToursetupComponent', () => {
  let component: ToursetupComponent;
  let fixture: ComponentFixture<ToursetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToursetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
