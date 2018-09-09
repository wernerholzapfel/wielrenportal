import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtappetableComponent } from './etappetable.component';

describe('EtappetableComponent', () => {
  let component: EtappetableComponent;
  let fixture: ComponentFixture<EtappetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtappetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtappetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
