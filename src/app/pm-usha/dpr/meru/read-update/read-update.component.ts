import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfs-read-update',
  templateUrl: './read-update.component.html',
  styleUrls: ['./read-update.component.scss']
})
export class ReadUpdateComponent implements OnInit {

  expand: boolean = false;
  anchor: string = 'Read more';

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.expand = !this.expand;
    this.anchor = this.expand ? 'Show less' : 'Read more';
  }
}
