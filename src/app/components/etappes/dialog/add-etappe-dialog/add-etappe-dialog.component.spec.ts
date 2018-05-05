import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtappeDialogComponent } from './add-etappe-dialog.component';

describe('AddEtappeDialogComponent', () => {
  let component: AddEtappeDialogComponent;
  let fixture: ComponentFixture<AddEtappeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtappeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtappeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
