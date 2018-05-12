import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanttableComponent } from './participanttable.component';

describe('ParticipanttableComponent', () => {
  let component: ParticipanttableComponent;
  let fixture: ComponentFixture<ParticipanttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipanttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
