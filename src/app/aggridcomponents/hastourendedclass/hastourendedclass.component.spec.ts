import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HastourendedclassComponent } from './hastourendedclass.component';

describe('HastourendedclassComponent', () => {
  let component: HastourendedclassComponent;
  let fixture: ComponentFixture<HastourendedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HastourendedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HastourendedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
