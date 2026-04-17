import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StatusNoteOneComponent } from './status-note-one/status-note-one.component';

@Component({
  selector: 'cfs-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit {
@ViewChild(StatusNoteOneComponent) tabOneComponent!: StatusNoteOneComponent;
selectedTabIndex: number = 0;
stateName:any = 'ALL'
filterStateListArr: any = [];
stateListArr: any;
stateList: Array<any> = [];
filterStateList: Array<any> = [];
triggerFetch: boolean = false;
  stateValue: any;

  constructor(private shared : SharedService, private masterService : MasterService) { }

  ngOnInit(): void {
    this.getSateData()
    
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
   
 }


 getSateData() {
  this.masterService.getStateData().subscribe((res) => {
    this.stateList = res;
    this.stateListArr = res
    this.filterStateList = this.stateList.slice();
    this.filterStateListArr = this.stateListArr.slice()
  }, () => { })
   
}


onSubmit() {
  this.selectedTabIndex = 0;
  this.triggerFetch = !this.triggerFetch;

  setTimeout(() => {
    if (this.tabOneComponent) {
      this.tabOneComponent.fetchData(this.stateName);  
    }
  }, 100);



}





}
