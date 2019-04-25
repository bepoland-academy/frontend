import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryRejectionComponent } from './time-entry-rejection.component';

describe('TimeEntryRejectionComponent', () => {
  let component: TimeEntryRejectionComponent;
  let fixture: ComponentFixture<TimeEntryRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
