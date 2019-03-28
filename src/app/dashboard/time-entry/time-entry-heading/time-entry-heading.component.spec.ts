import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryHeadingComponent } from './time-entry-heading.component';

describe('TimeEntryHeadingComponent', () => {
  let component: TimeEntryHeadingComponent;
  let fixture: ComponentFixture<TimeEntryHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
