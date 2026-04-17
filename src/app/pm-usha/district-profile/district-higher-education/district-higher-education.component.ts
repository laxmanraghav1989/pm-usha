import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Common } from 'src/app/shared/common';
import { GetService } from 'src/app/service/get.service';
import { DeleteService } from 'src/app/service/delete.service';

@Component({
  selector: 'cfs-district-higher-education',
  templateUrl: './district-higher-education.component.html',
  styleUrls: ['./district-higher-education.component.scss']
})
export class DistrictHigherEducationComponent implements OnInit, OnDestroy {
  districtCode: any;
  institutionsData: Array<any> = [];
  focusDistrict: Array<any> = [];
  listData: Array<any> = [];
  tempListData: Array<any> = [];
  tempInstitutionList: Array<any> = []
  searchText: any;
  addUpdate: boolean = false
  hideSelect: boolean = false;
  hideButton: boolean = false
  districtName: any;
  disabledPage: boolean = false
  stateCode: string;
  userTypeId: string;
  constructor(public api: ApiService, public notification: NotificationService,
    public getService: GetService,
    public sharedService: SharedService, public viewportScroller: ViewportScroller,
    public common: Common, public deleteService: DeleteService,) {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userTypeId=sessionStorage.getItem('userTypeId')
    // if(sessionStorage.getItem('stateP')){
    //   this.disabledPage = true
    //  }
    this.getFocusDis();
    this.getInstitutionTypeList();
    this.getPageStatusList()
  }

  ngOnInit(): void {
  }
  getPageStatusList() {
    this.api.getPageStatus('').subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].page === this.common.noIns) {
            this.disabledPage = true
          }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstitutionList() {
    this.api.getInstituteDataList(this.stateCode).subscribe(res => {
      this.listData = res.data;
      this.tempListData = [...this.listData];
      this.listData.forEach((ele) => {
        this.focusDistrict.forEach((obj, i) => {
          if (obj.districtCode === ele.districtCode) {
            this.focusDistrict.splice(i, 1);
            i--
          }
        })
      })
      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getFocusDis() {
    this.api.focusDisIndentifier1(this.stateCode).subscribe(res => {
      this.focusDistrict = res;
      this.getInstitutionList();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstitutionTypeList() {
    this.getService.getInstituteData().subscribe(res => {
      if (res && res.length) {
        this.institutionsData = [];
        res.forEach(element => {
          if (element.id === 4) {
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: element.id,
              id: 0,
              institutionTypeName: element.type,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total University'
            })
          } else if (element.id === 7) {
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: element.id,
              id: 0,
              institutionTypeName: element.type,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Standalone'
            })
          } else if (element.id === 11) {
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: element.id,
              id: 0,
              institutionTypeName: element.type,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Colleges'
            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Institution'
            })
          } else if (element.id === 17) {
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: element.id,
              id: 0,
              institutionTypeName: element.type,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Single Discipline Institutions'
            })
          } else {
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: element.id,
              id: 0,
              institutionTypeName: element.type,

            })
          }
        });
        this.tempInstitutionList = [...this.institutionsData]
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstitutionType() {
    this.api.getInstituteHigherData(this.districtCode).subscribe(res => {
      if (res.data && res.data.length) {
        this.institutionsData = [];
        res.data.forEach(element => {
          if (element.institutionTypeId === 4) {
            this.institutionsData.push({
              functionalInstCount: element.functionalInstCount ? element.functionalInstCount : 0,
              toBeFunctionalInstCount: element.toBeFunctionalInstCount ? element.toBeFunctionalInstCount : 0,
              institutionTypeId: element.institutionTypeId,
              id: element.id ? element.id : 0,
              institutionTypeName: element.institutionTypeName,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total University'
            })
          } else if (element.institutionTypeId === 7) {
            this.institutionsData.push({
              functionalInstCount: element.functionalInstCount ? element.functionalInstCount : 0,
              toBeFunctionalInstCount: element.toBeFunctionalInstCount ? element.toBeFunctionalInstCount : 0,
              institutionTypeId: element.institutionTypeId,
              id: element.id ? element.id : 0,
              institutionTypeName: element.institutionTypeName,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Standalone'
            })
          } else if (element.institutionTypeId === 11) {
            this.institutionsData.push({
              functionalInstCount: element.functionalInstCount ? element.functionalInstCount : 0,
              toBeFunctionalInstCount: element.toBeFunctionalInstCount ? element.toBeFunctionalInstCount : 0,
              institutionTypeId: element.institutionTypeId,
              id: element.id ? element.id : 0,
              institutionTypeName: element.institutionTypeName,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Colleges'
            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Institution'
            })
          } else if (element.institutionTypeId === 17) {
            this.institutionsData.push({
              functionalInstCount: element.functionalInstCount ? element.functionalInstCount : 0,
              toBeFunctionalInstCount: element.toBeFunctionalInstCount ? element.toBeFunctionalInstCount : 0,
              institutionTypeId: element.institutionTypeId,
              id: element.id ? element.id : 0,
              institutionTypeName: element.institutionTypeName,

            })
            this.institutionsData.push({
              functionalInstCount: 0,
              toBeFunctionalInstCount: 0,
              institutionTypeId: '',
              id: '',
              institutionTypeName: 'Total Single Discipline Institutions'
            })
          } else {
            this.institutionsData.push({
              functionalInstCount: element.functionalInstCount ? element.functionalInstCount : 0,
              toBeFunctionalInstCount: element.toBeFunctionalInstCount ? element.toBeFunctionalInstCount : 0,
              institutionTypeId: element.institutionTypeId,
              id: element.id ? element.id : 0,
              institutionTypeName: element.institutionTypeName,

            })
          }
        });

        this.totalCalculate('insti')
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  save(locked: boolean) {
    let temp = [];
    if (!this.districtCode) {
      this.notification.showValidationMessage('Please select district !!!');
      return
    }
    temp.push({
      districtCode: this.districtCode,
      stateCode: sessionStorage.getItem('stateCode'),
      focusDistrictHigherEducationalData: []
    })
    temp.forEach(obj => {
      this.institutionsData.forEach((ele, i: number) => {
        if (ele.id !== '') {
          obj['focusDistrictHigherEducationalData'].push({
            "functionalInstCount": ele.functionalInstCount,
            "id": ele.id,
            "institutionTypeId": ele.institutionTypeId,
            "toBeFunctionalInstCount": ele.toBeFunctionalInstCount
          })
        }
      })

    });
    if (temp['0'].focusDistrictHigherEducationalData.length === 0) {
      this.notification.showWarning();
      return;
    }
    this.api.saveDisHigherData(temp, this.common.Menu['9'].value, locked).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.districtCode = ''
        const fy = this.focusDistrict.findIndex(e => e.districtCode === this.districtCode);
        this.focusDistrict.splice(fy, 1);
        this.getInstitutionTypeList();

        this.getFocusDis();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  reset() {
    this.districtCode=''
    this.districtName=''
    this.institutionsData.forEach(e => {
      e.functionalInstCount = 0,
        e.toBeFunctionalInstCount = 0
    })
  }

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  totalCalculate(value: any) {
    this.institutionsData['4'].functionalInstCount = (this.institutionsData['0'].functionalInstCount?this.institutionsData['0'].functionalInstCount:0) + (this.institutionsData['1'].functionalInstCount?this.institutionsData['1'].functionalInstCount:0) + (this.institutionsData['2'].functionalInstCount?this.institutionsData['2'].functionalInstCount:0) + (this.institutionsData['3'].functionalInstCount?this.institutionsData['3'].functionalInstCount:0);
    this.institutionsData['8'].functionalInstCount = (this.institutionsData['5'].functionalInstCount?this.institutionsData['5'].functionalInstCount:0) + (this.institutionsData['6'].functionalInstCount?this.institutionsData['6'].functionalInstCount:0) + (this.institutionsData['7'].functionalInstCount?this.institutionsData['7'].functionalInstCount:0);
    this.institutionsData['13'].functionalInstCount = (this.institutionsData['9'].functionalInstCount?this.institutionsData['9'].functionalInstCount:0) + (this.institutionsData['10'].functionalInstCount?this.institutionsData['10'].functionalInstCount:0) + (this.institutionsData['11'].functionalInstCount?this.institutionsData['11'].functionalInstCount:0) + (this.institutionsData['12'].functionalInstCount?this.institutionsData['12'].functionalInstCount:0);
    this.institutionsData['14'].functionalInstCount = (this.institutionsData['4'].functionalInstCount?this.institutionsData['4'].functionalInstCount:0) + (this.institutionsData['8'].functionalInstCount?this.institutionsData['8'].functionalInstCount:0) + (this.institutionsData['13'].functionalInstCount?this.institutionsData['13'].functionalInstCount:0);
    this.institutionsData['21'].functionalInstCount = (this.institutionsData['15'].functionalInstCount?this.institutionsData['15'].functionalInstCount:0) + (this.institutionsData['16'].functionalInstCount?this.institutionsData['16'].functionalInstCount:0)
      + (this.institutionsData['17'].functionalInstCount?this.institutionsData['17'].functionalInstCount:0) + (this.institutionsData['18'].functionalInstCount?this.institutionsData['18'].functionalInstCount:0) + (this.institutionsData['19'].functionalInstCount?this.institutionsData['19'].functionalInstCount:0) + (this.institutionsData['20'].functionalInstCount?this.institutionsData['20'].functionalInstCount:0);
    this.institutionsData['4'].toBeFunctionalInstCount = (this.institutionsData['0'].toBeFunctionalInstCount?this.institutionsData['0'].toBeFunctionalInstCount:0) + (this.institutionsData['1'].toBeFunctionalInstCount?this.institutionsData['1'].toBeFunctionalInstCount:0) + (this.institutionsData['2'].toBeFunctionalInstCount?this.institutionsData['2'].toBeFunctionalInstCount:0) + (this.institutionsData['3'].toBeFunctionalInstCount?this.institutionsData['3'].toBeFunctionalInstCount:0);
    this.institutionsData['8'].toBeFunctionalInstCount = (this.institutionsData['5'].toBeFunctionalInstCount?this.institutionsData['5'].toBeFunctionalInstCount:0) + (this.institutionsData['6'].toBeFunctionalInstCount?this.institutionsData['6'].toBeFunctionalInstCount:0) + (this.institutionsData['7'].toBeFunctionalInstCount?this.institutionsData['7'].toBeFunctionalInstCount:0);
    this.institutionsData['13'].toBeFunctionalInstCount = (this.institutionsData['9'].toBeFunctionalInstCount?this.institutionsData['9'].toBeFunctionalInstCount:0) + (this.institutionsData['10'].toBeFunctionalInstCount?this.institutionsData['10'].toBeFunctionalInstCount:0) + (this.institutionsData['11'].toBeFunctionalInstCount?this.institutionsData['11'].toBeFunctionalInstCount:0) + (this.institutionsData['12'].toBeFunctionalInstCount?this.institutionsData['12'].toBeFunctionalInstCount:0);
    this.institutionsData['14'].toBeFunctionalInstCount = (this.institutionsData['4'].toBeFunctionalInstCount?this.institutionsData['4'].toBeFunctionalInstCount:0) + (this.institutionsData['8'].toBeFunctionalInstCount?this.institutionsData['8'].toBeFunctionalInstCount:0) + (this.institutionsData['13'].toBeFunctionalInstCount?this.institutionsData['13'].toBeFunctionalInstCount:0);
    this.institutionsData['21'].toBeFunctionalInstCount = (this.institutionsData['15'].toBeFunctionalInstCount?this.institutionsData['15'].toBeFunctionalInstCount:0) + (this.institutionsData['16'].toBeFunctionalInstCount?this.institutionsData['16'].toBeFunctionalInstCount:0)
      + (this.institutionsData['17'].toBeFunctionalInstCount?this.institutionsData['17'].toBeFunctionalInstCount:0) + (this.institutionsData['18'].toBeFunctionalInstCount?this.institutionsData['18'].toBeFunctionalInstCount:0) + (this.institutionsData['19'].toBeFunctionalInstCount?this.institutionsData['19'].toBeFunctionalInstCount:0) + (this.institutionsData['20'].toBeFunctionalInstCount?this.institutionsData['20'].toBeFunctionalInstCount:0);
  }
  add() {
    this.addUpdate = true;
    this.hideSelect = false;
    this.hideButton = false
    this.districtCode = ''
    this.institutionsData = [];
    this.institutionsData = [...this.tempInstitutionList]
  }
  editRow(item: any) {
    this.districtName = item.districtName
    this.addUpdate = true;
    this.hideSelect = true;
    this.hideButton = false
    this.districtCode = item.districtCode;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getInstitutionType()
  }
  viewRow(item: any) {
    this.hideButton = true;
    this.districtName = item.districtName
    this.addUpdate = true;
    this.hideSelect = true;
    this.districtCode = item.districtCode;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getInstitutionType()

  }
  close() {
    this.districtCode = ''
    this.addUpdate = false;
    this.hideSelect = false;
    this.hideButton = false
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  async updateResults() {
    this.listData = []
    this.listData = this.searchByValue(this.tempListData);
    this.handlePageChange(this.sharedService.page = 1)
  }



  searchByValue(userData: any) {
    return userData.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.districtName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.listData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.listData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.listData.length - 1);
    }

  }
  lock(locked: boolean) {
    this.api.saveDisHigherData1([], this.common.Menu['9'].value, locked, this.stateCode).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(this.sharedService.locked)
        this.getPageStatusList()
      }
    })
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }

  delete(item) {
    this.common.delete().subscribe(res => {
      if (res) {
        this.deleteService.deleteDistrictHigherEducation(item.districtCode).subscribe(res => {
          if (res.status === 200) {
            this.notification.showDelete();
            this.getFocusDis()
          }

        }, err => {

        })
      }
    })

  }
}
