import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleuitslagenComponent } from './toggleuitslagen.component';

describe('ToggleuitslagenComponent', () => {
  let component: ToggleuitslagenComponent;
  let fixture: ComponentFixture<ToggleuitslagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleuitslagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleuitslagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
