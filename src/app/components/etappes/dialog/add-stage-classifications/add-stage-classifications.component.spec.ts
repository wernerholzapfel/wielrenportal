import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStageClassificationsComponent } from './add-stage-classifications.component';

describe('AddStageClassificationsComponent', () => {
  let component: AddStageClassificationsComponent;
  let fixture: ComponentFixture<AddStageClassificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStageClassificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStageClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
