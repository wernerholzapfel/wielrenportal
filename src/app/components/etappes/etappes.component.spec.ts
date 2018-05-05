import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtappesComponent } from './etappes.component';

describe('EtappesComponent', () => {
  let component: EtappesComponent;
  let fixture: ComponentFixture<EtappesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtappesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtappesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
