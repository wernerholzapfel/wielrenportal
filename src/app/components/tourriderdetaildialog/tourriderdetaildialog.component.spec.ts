import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourriderdetaildialogComponent } from './tourriderdetaildialog.component';

describe('TourriderdetaildialogComponent', () => {
  let component: TourriderdetaildialogComponent;
  let fixture: ComponentFixture<TourriderdetaildialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourriderdetaildialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourriderdetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
