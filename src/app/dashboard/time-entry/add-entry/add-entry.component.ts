import { Component, ViewChild, Input, Output, EventEmitter, Renderer2, OnChanges, OnInit } from '@angular/core';
import { TimeEntryService } from '../time-entry.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent implements OnChanges, OnInit {
  @Input() clients = [];
  @Input() isOpen: boolean;
  @Output() isOpenChange = new EventEmitter();
  @Output() createNewProject = new EventEmitter();

  @ViewChild('drawer') drawer;
  chosenClient: any;
  isProjectsShown = false;
  chosenProject: string;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    console.log(this.clients);
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
  setClient(client) {
    this.chosenClient = client;
    this.isProjectsShown = true;
  }

  goBack() {
    this.isProjectsShown = false;
  }

  setProject(project) {
    this.createNewProject.emit(project);
    this.closeDrawer();
  }

}
