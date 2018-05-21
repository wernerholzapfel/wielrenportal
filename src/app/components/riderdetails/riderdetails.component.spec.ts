import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderdetailsComponent } from './riderdetails.component';

describe('RiderdetailsComponent', () => {
  let component: RiderdetailsComponent;
  let fixture: ComponentFixture<RiderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
