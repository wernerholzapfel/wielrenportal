import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelregelsComponent } from './spelregels.component';

describe('SpelregelsComponent', () => {
  let component: SpelregelsComponent;
  let fixture: ComponentFixture<SpelregelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelregelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelregelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
