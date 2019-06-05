import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadlineDialogComponent } from './add-headline-dialog.component';

describe('AddHeadlineDialogComponent', () => {
  let component: AddHeadlineDialogComponent;
  let fixture: ComponentFixture<AddHeadlineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeadlineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeadlineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
