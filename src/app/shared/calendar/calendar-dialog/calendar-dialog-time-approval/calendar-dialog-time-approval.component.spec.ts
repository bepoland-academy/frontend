import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDialogTimeApprovalComponent } from './calendar-dialog-time-approval.component';

describe('CalendarDialogTimeApprovalComponent', () => {
  let component: CalendarDialogTimeApprovalComponent;
  let fixture: ComponentFixture<CalendarDialogTimeApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDialogTimeApprovalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDialogTimeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
