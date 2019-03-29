import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassementenComponent } from './klassementen.component';

describe('KlassementenComponent', () => {
  let component: KlassementenComponent;
  let fixture: ComponentFixture<KlassementenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlassementenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassementenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
