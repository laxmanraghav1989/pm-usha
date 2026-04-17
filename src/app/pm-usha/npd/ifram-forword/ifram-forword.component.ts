import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'cfs-ifram-forword',
  templateUrl: './ifram-forword.component.html',
  styleUrls: ['./ifram-forword.component.scss']
})
export class IframForwordComponent implements OnInit {
  src: any
  constructor(private route: ActivatedRoute) {
    this.src = 'changingThisBreaksApplicationSecurity: "blob:http://localhost:4200/e22c01a9-ed0d-43ab-a222-928701c475de"'
  }

  ngOnInit(): void {
  }

}
