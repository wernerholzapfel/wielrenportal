import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HeadlinesEditComponent} from './headlines-edit.component';


describe('HeadlinesEditComponent', () => {
  let component: HeadlinesEditComponent;
  let fixture: ComponentFixture<HeadlinesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadlinesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlinesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
