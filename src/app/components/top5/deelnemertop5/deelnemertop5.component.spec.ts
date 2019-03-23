import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Deelnemertop5Component } from './deelnemertop5.component';

describe('Deelnemertop5Component', () => {
  let component: Deelnemertop5Component;
  let fixture: ComponentFixture<Deelnemertop5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Deelnemertop5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Deelnemertop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
