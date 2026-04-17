import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'cfs-ins-locked-month',
  templateUrl: './ins-locked-month.component.html',
  styleUrls: ['./ins-locked-month.component.scss']
})
export class InsLockedMonthComponent implements OnChanges {
  public routers: typeof routes = routes;
  getLockList: any;
  stateCode: string;
  aisheCode: string;
   @Input() componentId!: string | null;
   @Input() refresh: any;
  insType: string;
  instituteCategory: string;
  pabApproved: string;
  pabConditionallyApproved: string;
  trueValues: string[];
  trueValuesConditionally: string[];
  showTable:boolean = true;
  activatedRoute: ActivatedRoute;

  constructor(public getService: GetService, private encrypt: EncryptDecrypt, public router: Router, public sharedService: SharedService) { 

    this.stateCode = sessionStorage.getItem("stateCode")
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.pabApproved = sessionStorage.getItem("pabApproved");
    this.pabConditionallyApproved = sessionStorage.getItem(
      "pabConditionallyApproved"
    );
    this.trueValues = this.extractTrueValue(this.pabApproved);
    this.trueValuesConditionally = this.extractTrueValue(
      this.pabConditionallyApproved
    );
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      // if URL contains view page → hide table
      this.showTable = !event.url.includes('view');
    }
  });
  }
  

  ngOnChanges(){
    this.componentId = this.trueValues[0]|| this.trueValuesConditionally[0]
    if (this.refresh) {
      this.getLockStatus1()
    }
  }

   private extractTrueValue(input: string): string[] {
    if (!input) return [];
    const pairs = input.split(",");
    const trueValues = [];

    for (const pair of pairs) {
      const [key, value] = pair.split(":");
      if (value?.trim() === "true") {
        trueValues.push(key);
      }
    }

    return trueValues;
  }

   getLockStatus1() {
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
        aisheCode: encryptedAishe,
        // isForwardedToNpd: true,
        stateCode : this.stateCode,
        componentId: this.componentId
      }
    this.getService.getLockPMUshaProgressListLock1(payload).subscribe(res => {
      this.getLockList = res?.data.filter(x => x.lockStatus)
    }
    )
  }

  datailsList(ele: any): void {
  sessionStorage.setItem('selectIndex', '0');
  const routeParams = [
    ele.componentId,
    this.sharedService.uniqueLockValue,
    ele.year,
    ele.month,
    ele.id,
    ele.stateCode
  ];

  if (ele.componentId === this.sharedService.genderComponentId) {
    this.router.navigate([this.routers.viewinstGenderLock, ...routeParams]);
  }
  else {
    this.router.navigate( ['college', ...routeParams],
      { relativeTo: this.activatedRoute });
  }
    
}

}
