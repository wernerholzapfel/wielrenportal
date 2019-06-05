import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TourriderDetailComponent} from './tourrider-detail.component';


describe('TourriderdetaildialogComponent', () => {
  let component: TourriderDetailComponent;
  let fixture: ComponentFixture<TourriderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourriderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourriderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
