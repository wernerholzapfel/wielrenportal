import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitslagenComponent } from './uitslagen.component';

describe('UitslagenComponent', () => {
  let component: UitslagenComponent;
  let fixture: ComponentFixture<UitslagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitslagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitslagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
