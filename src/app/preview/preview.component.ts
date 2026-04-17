import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cfs-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() srcUrl!: any;

  constructor() { }

  ngOnInit(): void {
  }


}
