import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourridersComponent } from './tourriders.component';

describe('TourridersComponent', () => {
  let component: TourridersComponent;
  let fixture: ComponentFixture<TourridersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourridersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourridersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
