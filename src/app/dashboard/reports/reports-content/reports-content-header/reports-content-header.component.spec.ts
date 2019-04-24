import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContentHeaderComponent } from './reports-content-header.component';

describe('ReportsContentHeaderComponent', () => {
  let component: ReportsContentHeaderComponent;
  let fixture: ComponentFixture<ReportsContentHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsContentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsContentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
