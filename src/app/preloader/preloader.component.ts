import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  template: `
    <mat-spinner></mat-spinner>
  `,
  styles: [`
    .mat-spinner {margin: auto}
  `],
})
export class PreloaderComponent implements OnInit {
  @Input() isSuccess: string;

  constructor() { }

  ngOnInit() {
    console.log(this.isSuccess);
  }

}
