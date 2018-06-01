import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantpredictionsComponent } from './participantpredictions.component';

describe('ParticipantpredictionsComponent', () => {
  let component: ParticipantpredictionsComponent;
  let fixture: ComponentFixture<ParticipantpredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantpredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantpredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
