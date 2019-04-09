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
  @Output() createNewEntry: EventEmitter<Project> = new EventEmitter();

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
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  closeDrawer() {
    this.drawer.close();
    setTimeout(() => {
      this.isOpenChange.emit(false);
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }, 200);
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
    this.createNewEntry.emit(project);
    this.closeDrawer();
  }

}
