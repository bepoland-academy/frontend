import { Component, ViewChild, Input, Output, EventEmitter, Renderer2, OnChanges, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { ProjectsByClient, Project } from '../../../core/models';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0)',
      })),
      state('close', style({
        transform: 'translateX(100%)',
      })),
      transition('void => open', [
        animate('300ms'),
      ]),
      transition('open => close', [
        animate('300ms'),
      ]),
    ]),
  ],
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
  animationState = 'open';

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.animationState === 'open') {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  closeDrawer() {
    this.animationState = 'close';
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    setTimeout(() => {
      this.isOpenChange.emit(false);
      this.drawer.close();
    }, 300);

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
