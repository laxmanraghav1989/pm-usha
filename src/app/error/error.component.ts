import { DOCUMENT } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routes } from '../routes';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public routers: typeof routes = routes;
  constructor(public router:Router,@Inject(DOCUMENT) private document: Document) {
    sessionStorage.clear();
   }

  ngOnInit(): void {
  }
  homepage(){
    this.router.navigate(['/'])
    // window.location.href = environment.aisheMain;;
  }
}
