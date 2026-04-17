import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cfs-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.scss']
})
export class ThumbComponent implements OnInit {
  @Input() srcUrl!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
