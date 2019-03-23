import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ridertop5Component } from './ridertop5.component';

describe('Ridertop5Component', () => {
  let component: Ridertop5Component;
  let fixture: ComponentFixture<Ridertop5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ridertop5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ridertop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
