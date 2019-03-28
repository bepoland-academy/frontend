import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryNaviagtionComponent } from './time-entry-naviagtion.component';

describe('TimeEntryNaviagtionComponent', () => {
  let component: TimeEntryNaviagtionComponent;
  let fixture: ComponentFixture<TimeEntryNaviagtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryNaviagtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryNaviagtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
