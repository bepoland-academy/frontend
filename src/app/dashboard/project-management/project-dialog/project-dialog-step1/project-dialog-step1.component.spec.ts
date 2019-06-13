import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogStep1Component } from './project-dialog-step1.component';

describe('ProjectDialogStep1Component', () => {
  let component: ProjectDialogStep1Component;
  let fixture: ComponentFixture<ProjectDialogStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
