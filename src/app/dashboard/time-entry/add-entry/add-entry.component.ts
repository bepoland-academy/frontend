import { Component, ViewChild, Input, Output, EventEmitter, Renderer2, OnChanges, OnInit } from '@angular/core';
import { TimeEntryService } from '../time-entry.service';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent implements OnChanges, OnInit {
  clients = [
    {
      name: 'PZU',
      projects: [
        'Jeden',
        'dwadziescia',
        '44',
        'Grupa inwalidzka do przeprowadzki',
        'Praca w godzinach nadliczbowych',
      ],
    },
    {
      name: 'BePoland',
      projects: [
        'Akademia',
        'Akademia dwa',
        'Akademia',
        'Przeprowadzki',
        'Jazda na rowerze samochodem',
      ],
    },
  ];
  @Input() isOpen: boolean;
  @Output() isOpenChange = new EventEmitter();
  @ViewChild('drawer') drawer;
  chosenClient: string;
  isProjectsShown = false;
  projectsToChose: Array<string> = [];
  chosenProject: string;

  constructor(
    private renderer: Renderer2,
    private timeEntryService: TimeEntryService
  ) {}

  ngOnInit() {
    // nie zrobiony endpoint
    // this.timeEntryService.getClients().subscribe(clients => {
    //   console.log(clients);
    //   this.clients = clients._embedded.clientBodyList;
    // });
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
    this.chosenClient = '';
    this.isProjectsShown = false;
  }
  setClient(client) {
    this.chosenClient = client.name;
    this.projectsToChose = client.projects;
    this.isProjectsShown = true;
  }

  goBack() {
    this.isProjectsShown = false;
  }

  setProject(project) {
    this.timeEntryService.createNewEntry(this.chosenClient, project);
    this.closeDrawer();
  }

}
