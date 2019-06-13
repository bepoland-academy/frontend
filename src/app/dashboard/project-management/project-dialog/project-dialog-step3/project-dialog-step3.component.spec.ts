import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogStep3Component } from './project-dialog-step3.component';

describe('ProjectDialogStep3Component', () => {
  let component: ProjectDialogStep3Component;
  let fixture: ComponentFixture<ProjectDialogStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
