import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "cfs-d-profile",
  templateUrl: "./d-profile.component.html",
  styleUrls: ["./d-profile.component.scss"],
})
export class DProfileComponent implements OnInit {
  districtList: Array<any> = [];
  focusList: Array<any> = [];
  checkboxes:boolean = false;
  focusDistrictUnderTaking:boolean=false;
  districtIndicator: Array<any> = [];
  identificationList: Array<any> = [];
  identifier: any[] = [];
  focusDistrictData: Array<any> = [];
  disabledPage:boolean=false
  stateCode: string;
  districtTotal: boolean;
  focusDistrictIndicatore: boolean;
  focusDistrict: boolean;
  selectedIndex:any=0
  userTypeId: string;
  constructor(public api: ApiService,public notification: NotificationService,public common:Common,public masterService:MasterService,
    public getService:GetService,public sharedService:SharedService
  ) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId=sessionStorage.getItem('userTypeId')
   }

  ngOnInit(): void {
    // this.getDistrict();
    this.getFocusDis();
    this.getFocusDistIdentifier()
    this.getDistrictIndicator();
    this.getPageStatusList();
  }
  tabSelected(event: any) {
    this.selectedIndex = event.index
    if (event.index === 1) {
    }
  }
  getPageStatusList() {
    this.api.getPageStatus('').subscribe(res => {
      if(res.data && res.data.length){
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].page === this.common.districtTotal) {
             this.districtTotal = true
          }if (res.data[index].page === this.common.focusDistrictIndicatore) {
            this.focusDistrictIndicatore = true
          }if (res.data[index].page === this.common.focusDistrict) {
            this.focusDistrict = true
          }
         
         }
         if(this.districtTotal && this.focusDistrictIndicatore && this.focusDistrict){
          this.sharedService.setMenu(true)
         }
      }
    
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDistrictIndicator() {
    this.api.districtIndicator().subscribe(
      (res) => {
        this.districtIndicator = res;
      },
      (err) => { }
    );
  }
  getFocusDistIdentifier() {
    this.api.focusDisIndentifier1(this.stateCode).subscribe(res => {
      if (res && res.length) {
        this.identifier = res;
        this.focusDistrictData = res;
        // this.focusDistrictData.forEach(element => {
          // if (element.ger === '00') {
          //   element.ger = ''
          // } if (element.sc === '00') {
          //   element.sc = ''
          // } if (element.st === '00') {
          //   element.st = ''
          // } if (element.obc === '00') {
          //   element.obc = ''
          // } if (element.gpi === '00') {
          //   element.gpi = ''
          // } if (element.female === '00') {
          //   element.female = ''
          // } if (element.transgender === '00') {
          //   element.transgender = ''
          // }
        // });
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // getFocusDisIdentifier() {
  //   this.api.focusDisIndentifier().subscribe((res) => {
  //     this.identifier = res.data;
  //     this.identifier.forEach((e) => {
  //       if (e.indicators && e.indicators.length) {
  //         e.indicators.forEach((obj) => {
  //           if (obj.focusDistrictIndicator.id === 1) {
  //             e["lowGer"] = true;
  //             e["lowGERID"] = 1;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 2) {
  //             e["ppsc"] = true;
  //             e["ppscId"] = 2;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 3) {
  //             e["ppst"] = true;
  //             e["ppstID"] = 3;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 4) {
  //             e["ppobc"] = true;
  //             e["ppobcId"] = 4;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 5) {
  //             e["gpi"] = true;
  //             e["gpiID"] = 5;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 6) {
  //             e["ppf"] = true;
  //             e["ppfId"] = 6;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 7) {
  //             e["ppt"] = true;
  //             e["pptId"] = 7;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 8) {
  //             e["ad"] = true;
  //             e["adID"] = 8;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 9) {
  //             e["lwead"] = true;
  //             e["lweadId"] = 9;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //           if (obj.focusDistrictIndicator.id === 10) {
  //             e["bad"] = true;
  //             e["badId"] = 10;
  //             e['indicatorSerialId'] = obj.id
  //           }
  //         });
  //       } else {
  //         e["lowGer"] = false;
  //         e["lowGERID"] = 1;
  //         e['indicatorSerialId'] = 0

  //         e["ppsc"] = false;
  //         e["ppscId"] = 2;
  //         e['indicatorSerialId'] = 0

  //         e["ppst"] = false;
  //         e["ppstID"] = 3;
  //         e['indicatorSerialId'] = 0

  //         e["ppobc"] = false;
  //         e["ppobcId"] = 4;
  //         e['indicatorSerialId'] = 0

  //         e["gpi"] = false;
  //         e["gpiID"] = 5;
  //         e['indicatorSerialId'] = 0

  //         e["ppf"] = false;
  //         e["ppfId"] = 6;
  //         e['indicatorSerialId'] = 0

  //         e["ppt"] = false;
  //         e["pptId"] = 7;
  //         e['indicatorSerialId'] = 0

  //         e["ad"] = false;
  //         e["adID"] = 8;
  //         e['indicatorSerialId'] = 0

  //         e["lwead"] = false;
  //         e["lweadId"] = 9;
  //         e['indicatorSerialId'] = 0

  //         e["bad"] = false;
  //         e["badId"] = 10;
  //         e['indicatorSerialId'] = 0
  //       }
  //     });
  //   });
  //   (err) => { };
  // }
  getDistrict() {
    this.masterService.getDistrictList(sessionStorage.getItem("stateCode")).subscribe(
      (res) => {
        this.districtList = res;
      },
      (err) => { }
    );
  }

  getFocusDis() {
    this.focusList = [];
    this.getService.getFocusDistrict(sessionStorage.getItem("stateCode")).subscribe(
      (res) => {
        if (res.list && res.list.length) {
          this.focusList = res.list;
          this.focusDistrictUnderTaking=true
        }
      },
      (err) => { }
    );
  }
  saveIdentifier() {
    let array = [];
    // this.focusList.forEach(element => {
    //   if(element.focus){
    //     array.push({
    //       "district": {
    //         "distCode": element.distCode,
    //         "focus": element.focus,
    //         "lgdDistrictCode": element.lgdDistrictCode,
    //         "name": element.name,
    //         "stCode": element.stCode
    //       },
    //       "focusDistrictIndicator": {
    //         "id": ,
    //         "indicatorName": "string"
    //       },
    //       "id": 0,
    //       "indicatorValue": "string",
    //       "isIndicatorAvailable": true,
    //       "stateCode": "string"
    //     })
    //   }

    // });
  }
  checkCheckBoxvalue(e: any) {
    this.checkboxes=false
  }
  save(locked:boolean) {
    if(!this.focusDistrictUnderTaking){
      this.notification.showValidationMessage('Please select check boxes');
      this.checkboxes=true
      return;
    }
    let temp = [];
    let array = [];
    this.focusList.forEach((ele: any) => {
      array.push({
        distCode: ele.distCode,
        focus: ele.focus,
        lgdDistrictCode: ele.lgdDistrictCode,
        name: ele.name,
        stCode: ele.stCode,
        shortName:ele.shortName
      });
      if (ele.focus) {
        temp.push({
          distCode: ele.distCode,
          focus: ele.focus,
          lgdDistrictCode: ele.lgdDistrictCode,
          name: ele.name,
          stCode: ele.stCode,
        });
      }
    });
    if (temp.length === 0) {
      this.notification.showValidationMessage(`Either 5 Focus Districts in the States/UTs or 50% of the total districts !!!`);
      return;
    }
    if(temp.length > 5){
      let a = Math.ceil(this.focusList.length / 2);
      // let a = Math.ceil(temp.length / this.focusList.length * 100);
      if (a < temp.length) {
        this.notification.showValidationMessage('Either 5 Focus Districts in the States/UTs or 50% of the total districts !!!');
        return;
      }
    }
    // let a = Math.ceil(temp.length / this.focusList.length * 100);
    // if (a > 50) {
    //   this.notification.showValidationMessage('Please choose at-least 50% of district');
    //   return;
    // }

    this.api.saveFocusDis(array,this.common.Menu['6'].value,locked).subscribe(
      (res) => {
        if (res.status === 200) {
          // this.notification.showSuccess();
          this.getFocusDis();
          this.getFocusDistIdentifier();
          if(locked){
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          }else{
            this.notification.showSuccess();
          }
        }
      },
      (err) => { }
    );
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  
  // saveFoucsIdentifier() {
  //   let temp = [];
  //   temp['indicators'] = [];
  //   this.identifier.map((o, i: number) => {
  //     if (o.lowGer) {
  //       if (o['indicators'] && o['indicators'].length) {
  //         o['indicators']["id"] = o.indicatorSerialId,
  //           o['indicators']["focusDistrictIndicator"] = {
  //             "id": o.lowGERID,
  //             "indicatorName": "string"
  //           },
  //           o['indicators']["isIndicatorAvailable"] = true
  //       } else {
  //         o['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.lowGERID,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //       }
  //       // temp["districtCode"] = o.districtCode,
  //       //   temp["name"] = o.name,
  //       //   temp["stateCode"] = o.districtCode,
  //       //   temp['indicators'].push({
  //       //     "id": o.indicatorSerialId,
  //       //     "focusDistrictIndicator": {
  //       //       "id": o.lowGERID,
  //       //       "indicatorName": "string"
  //       //     },
  //       //     "isIndicatorAvailable": true
  //       //   })
  //     } if (o.ppsc) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.ppscId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ppsc) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.ppscId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ppobc) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.ppobcId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ppobc) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.ppobcId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ppf) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.ppfId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ppt) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.pptId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.ad) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.adID,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.lwead) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.lweadId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     } if (o.bad) {
  //       temp["districtCode"] = o.districtCode,
  //         temp["name"] = o.name,
  //         temp["stateCode"] = o.districtCode,
  //         temp['indicators'].push({
  //           "id": o.indicatorSerialId,
  //           "focusDistrictIndicator": {
  //             "id": o.badId,
  //             "indicatorName": "string"
  //           },
  //           "isIndicatorAvailable": true
  //         })
  //     }
  //   });
  // }
  saveFoucsIdentifier(locked:boolean) {
    let temp = [];
    
    this.identifier.forEach(element => {
      temp.push({
        aspirational: element.aspirational === null ? false : element.aspirational,
        bda: element.bda === null ? false : element.bda,
        lwe: element.lwe === null ? false : element.lwe,
        femaleBoolean: element.femaleBoolean === null ? false : element.femaleBoolean,
        gerBoolean: element.gerBoolean === null ? false : element.gerBoolean,
        gpiBoolean: element.gpiBoolean === null ? false : element.gpiBoolean,
        obcBoolean: element.obcBoolean === null ? false : element.obcBoolean,
        scBoolean: element.scBoolean === null ? false : element.scBoolean,
        stBoolean: element.stBoolean === null ? false : element.stBoolean,
        transgenderBoolean: element.transgenderBoolean === null ? false : element.transgenderBoolean,

     
        female: element.femaleBoolean === false ? '' : element.female?.toString(),
        ger: element.gerBoolean === false ? '' : element.ger?.toString(),
        gpi: element.gpiBoolean === false ? '' : element.gpi?.toString(),
        obc: element.obcBoolean === false ? '' : element.obc?.toString(),
        sc: element.scBoolean === false ? '' : element.sc?.toString(),
        st: element.stBoolean === false ? '' : element.st?.toString(),
        transgender: element.transgenderBoolean === false ? '' : element.transgender?.toString(),
        districtCode: element.districtCode,
        districtName: element.districtName,
        stateCode: element.stateCode,
        id: element.id === null ? 0 : element.id
      })
    });
    this.api.saveFocusDisIdentifier(temp,this.common.Menu['7'].value,locked).subscribe(res => {
      if (res.status === 200) {
       
        this.getFocusDistIdentifier();
        if(locked){
          this.getPageStatusList()
          this.notification.showSuccessMessage(this.sharedService.locked)
        }else{
          this.notification.showSuccess();
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveFoucsIdentifierData(locked:boolean) {
    let temp = [];
    for (let index = 0; index < this.identifier.length; index++) {
      if (this.identifier[index].gerBoolean) {
        if (this.identifier[index].ger === '') {
          this.notification.showValidationMessage('Please enter Low GER');
          return;
        }
      } if (this.identifier[index].gpiBoolean) {
        if (this.identifier[index].gpi === '') {
          this.notification.showValidationMessage('Please enter Gender Parity Index');
          return;
        }
      } if (this.identifier[index].scBoolean) {
        if (this.identifier[index].sc === '') {
          this.notification.showValidationMessage('Please enter Population proportion of SC');
          return;
        }
      } if (this.identifier[index].stBoolean) {
        if (this.identifier[index].st === '') {
          this.notification.showValidationMessage('Please enter Population proportion of ST');
          return;
        }
      } if (this.identifier[index].obcBoolean) {
        if (this.identifier[index].obc === '') {
          this.notification.showValidationMessage('Please enter Population proportion of OBC');
          return;
        }
      } if (this.identifier[index].femaleBoolean) {
        if (this.identifier[index].female === '') {
          this.notification.showValidationMessage('Please enter Population proportion of Females');
          return;
        }
      }
      if (this.identifier[index].transgenderBoolean) {
        if (this.identifier[index].transgender === '') {
          this.notification.showValidationMessage('Please enter Population proportion of Transgender');
          return;
        }
      }

    }
    this.identifier.forEach(element => {
      temp.push({
        aspirational: element.aspirational === null ? false : element.aspirational,
        bda: element.bda === null ? false : element.bda,
        lwe: element.lwe === null ? false : element.lwe,
        female: element.femaleBoolean === false ? '' : element.female?.toString(),
        ger: element.gerBoolean === false ? '' : element.ger?.toString(),
        gpi: element.gpiBoolean === false ? '' : element.gpi?.toString(),
        obc: element.obcBoolean === false ? '' : element.obc?.toString(),
        sc: element.scBoolean === false ? '' : element.sc?.toString(),
        st: element.stBoolean === false ? '' : element.st?.toString(),
        transgender: element.transgenderBoolean === false ? '' : element.transgender?.toString(),
        femaleBoolean: element.femaleBoolean === null ? false : element.femaleBoolean,
        gerBoolean: element.gerBoolean === null ? false : element.gerBoolean,
        gpiBoolean: element.gpiBoolean === null ? false : element.gpiBoolean,
        obcBoolean: element.obcBoolean === null ? false : element.obcBoolean,
        scBoolean: element.scBoolean === null ? false : element.scBoolean,
        stBoolean: element.stBoolean === null ? false : element.stBoolean,
        transgenderBoolean: element.transgenderBoolean === null ? false : element.transgenderBoolean,
        districtCode: element.districtCode,
        districtName: element.districtName,
        stateCode: element.stateCode,
        id: element.id === null ? 0 : element.id
      })
    });
    if (temp.length !== 0) {
      this.api.saveFocusDisIdentifier(temp,this.common.Menu['8'].value,locked).subscribe(res => {
        if (res.status === 200) {
          this.getFocusDistIdentifier();
          if(locked){
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          }else{
            this.notification.showSuccess();
          }
        }
      }, err => {

      })
    }

  }
  reset() {
    this.checkboxes=false

    if(this.selectedIndex === 0){
      this.focusList.forEach(e => {
        e.focus=false
      });
      this.focusDistrictUnderTaking=false
    }if(this.selectedIndex === 1){
    this.identifier.forEach(e=>{
      e.gerBoolean=false
      e.scBoolean=false
      e.stBoolean=false
      e.obcBoolean=false
      e.gpiBoolean=false
      e.femaleBoolean=false
      e.transgenderBoolean=false
      e.aspirational=false
      e.lwe=false
      e.bda=false
    })

   }if(this.selectedIndex === 2){
    this.focusDistrictData.forEach(e=>{
      e.ger=''
      e.sc=''
      e.st=''
      e.obc=''
      e.gpi=''
      e.female=''
      e.transgender=''
    })
   }
}
}
