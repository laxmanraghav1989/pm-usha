import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/routes';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cfs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public routers: typeof routes = routes;
  deadlineDate: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const today = new Date();
    const day = today.getDate();
  
    let deadlineMonth = today.getMonth(); // 0-indexed (0 = Jan)
    let deadlineYear = today.getFullYear();
  
    // If today is 15 or later, shift to next month
    if (day >= 16) {
      deadlineMonth++;
      if (deadlineMonth > 11) {
        deadlineMonth = 0;
        deadlineYear++;
      }
    }
  
    // Format date as "15 Apr 2025"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.deadlineDate = `16 ${monthNames[deadlineMonth]} ${deadlineYear}`;
    
  }
  isRunning = true;

  toggleMarquee() {
    this.isRunning = !this.isRunning;
  }


}