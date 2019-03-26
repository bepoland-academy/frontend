import { Component, ViewChild, Input, Output, EventEmitter, Renderer2, OnChanges, OnInit } from '@angular/core';

import { ProjectsByClient, Project } from '../../../core/models';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent implements OnChanges, OnInit {
  @Input() clients: Array<ProjectsByClient> = [];
  @Input() isOpen: boolean;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createNewProject: EventEmitter<Project> = new EventEmitter();

  @ViewChild('drawer') drawer;
  chosenClient: ProjectsByClient;
  isProjectsShown = false;
  chosenProject: string;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.renderer.addClass(document.body, 'drawer-open');
    }
  }

  closeDrawer() {
    this.drawer.close();
    setTimeout(() => {
      this.isOpenChange.emit(false);
    }, 200);
    this.renderer.removeClass(document.body, 'drawer-open');
    this.chosenClient = null;
    this.isProjectsShown = false;
  }
  setClient(client: ProjectsByClient) {
    this.chosenClient = client;
    this.isProjectsShown = true;
  }

  goBack() {
    this.isProjectsShown = false;
  }

  setProject(project: Project) {
    this.createNewProject.emit(project);
    this.closeDrawer();
  }

}
