import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfs-read-explore',
  templateUrl: './read-explore.component.html',
  styleUrls: ['./read-explore.component.scss']
})
export class ReadExploreComponent implements OnInit {

  expand: boolean = false;
  anchor: string = 'Read more';

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.expand = !this.expand;
    this.anchor = this.expand ? 'Show less' : 'Read more';
  }
}