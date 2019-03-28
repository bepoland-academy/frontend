import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryFooterComponent } from './time-entry-footer.component';

describe('TimeEntryFooterComponent', () => {
  let component: TimeEntryFooterComponent;
  let fixture: ComponentFixture<TimeEntryFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
