import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittourriderdialogComponent } from './edittourriderdialog.component';

describe('EdittourriderdialogComponent', () => {
  let component: EdittourriderdialogComponent;
  let fixture: ComponentFixture<EdittourriderdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittourriderdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittourriderdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
