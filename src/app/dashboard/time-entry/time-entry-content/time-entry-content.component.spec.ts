import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryContentComponent } from './time-entry-content.component';

describe('TimeEntryContentComponent', () => {
  let component: TimeEntryContentComponent;
  let fixture: ComponentFixture<TimeEntryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
