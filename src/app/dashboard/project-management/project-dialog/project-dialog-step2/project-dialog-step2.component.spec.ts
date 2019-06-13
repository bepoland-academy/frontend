import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogStep2Component } from './project-dialog-step2.component';

describe('ProjectDialogStep2Component', () => {
  let component: ProjectDialogStep2Component;
  let fixture: ComponentFixture<ProjectDialogStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
