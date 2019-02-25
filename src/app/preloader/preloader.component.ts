import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
  styles: ['.hidden {display: none}'],
})
export class PreloaderComponent implements OnInit {
  @Input() isSuccess: string;

  constructor() { }

  ngOnInit() {
    console.log(this.isSuccess);
  }

}
