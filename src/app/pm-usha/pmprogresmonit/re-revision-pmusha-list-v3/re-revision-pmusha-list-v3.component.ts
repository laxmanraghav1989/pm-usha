import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { ExcelService } from 'src/app/service/excel.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-re-revision-pmusha-list-v3',
  templateUrl: './re-revision-pmusha-list-v3.component.html',
  styleUrls: ['./re-revision-pmusha-list-v3.component.scss']
})
export class ReRevisionPmushaListV3Component implements OnInit {

public routers: typeof routes = routes;
  collegeListData: any[] = [];
  tempList: any[] = [];
  searchText: any;
  stateCode: string;
  userTypeId: any;
  componentId: any = '';
  stateList: Array<any> = [];
  variables: Array<any> = [];
  districtList: Array<any> = [];
  filterDistrictList: Array<any> = [{ distCode: 'null', stateCode: 'null', name: 'ALL', sno: null, lgdDistCode: null }];
  stateId: string = 'ALL'
  sortDir = 1;//1= 'ASE' -1= DSC
  districtId: string = 'ALL';
  pabActionId: any = 'ALL';
  pabActionNumber: any;
  consultantUserId: string = 'ALL';
  userList: Array<any> = [];
  allotment: string = 'ALL';
  status: string = 'ALL'
  userId: string;
  UpdatedropList: any = [{ id: 1, name: 'Approved' }, { id: 3, name: 'Conditionally Approved' }];
  StateGroup: boolean;
  name: string;
  pm: any;
  pmUsha: any;
  revision: any;
  addRemarks: string;
  isProposalRevisionEsignDone: boolean;
  isEsignDoneEquity: boolean;
  isFilterVisible:any;
  isSearchClicked = false;
  componentList: Array<any> = [{id: 1, componentName: 'Multi-Disciplinary Education and Research Universities (MERU)'},
    {id: 2, componentName: 'Grants to Strengthen Universities (Accredited & Unaccredited Universities)'},
    {id: 3, componentName: 'Grants to Strengthen Colleges (Accredited & Unaccredited Colleges)'},
    // {id: 4, componentName: 'New Model Degree Colleges'},
      {id: 5, componentName: 'Gender Inclusion and Equity Initiatives'}
  ]
  stateName: any;
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService,
    public sharedService: SharedService, public router: Router, private route: ActivatedRoute, public getService: GetService, public postService: PostService, public encrypt: EncryptDecrypt, private excelService: ExcelService, private dialog : MatDialog) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.isProposalRevisionEsignDone = Boolean(this.encrypt.getDecryptedValue(sessionStorage?.getItem('isProposalRevisionEsignDone')));
    this.isEsignDoneEquity = Boolean(this.encrypt.getDecryptedValue(sessionStorage?.getItem('isEsignDoneEquity')));
    this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id || this.userTypeId === this.sharedService.userTypeList['11'].id
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id) {
      this.getUserType()
      this.userId = sessionStorage.getItem('userName')
    }
    if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
      this.consultantUserId = sessionStorage.getItem('userName')
    }
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
      this.stateId = this.stateCode;
      this.getDistrict(this.stateId);
      this.districtId = sessionStorage.getItem('districtCode');
      this.districtId = this.districtId ? this.districtId : 'ALL'
    }
    this.addRemarks = sessionStorage.getItem('addRemarks');
 
   
  }
  ngOnInit(): void {
    
    
    this.getStateList();
    // this.componentId = this.route.snapshot.paramMap.get('id');
    this.pmUsha = this.route.snapshot.paramMap.get('pm-usha');
    this.revision = Number(this.route.snapshot.paramMap.get('re-revision'));
   
    if (sessionStorage.getItem('back') === 'true') {

      this.stateId = sessionStorage.getItem('filteredStateCode')
      this.getDistrict(this.stateId);
      this.componentId = +sessionStorage.getItem('filteredComponentId') ? +sessionStorage.getItem('filteredComponentId') : 'ALL'
      this.districtId = sessionStorage.getItem('filteredDistrictCode') ? sessionStorage.getItem('filteredDistrictCode') : 'ALL'
      this.consultantUserId = sessionStorage.getItem('filteredConsultantUserId')
      this.status = sessionStorage.getItem('filteredStatus')
      this.allotment = sessionStorage.getItem('filteredAllotmentStatus')
      this.pabActionId = sessionStorage.getItem('filteredActionStatus')
      this.collegeList()

    }
    // this.getPABDropValue()

    // this.stateId = this.route.snapshot.paramMap.get('stateCode')
    // this.collegeList();

  }
  getUserType() {
    this.postService.getUserByType([this.sharedService.userTypeList['7'].id, this.sharedService.userTypeList['6'].id]).subscribe(res => {
      this.userList = res;
      this.userList.forEach(e => {
        e.userAcronym = e.userAcronym.replace('TSG-', '');
      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  unlock(item, RemarksValue){
    let temp = [{
      id: item?.id,
      isV3Locked: false,
      revisedProposalV3Cost: item?.revisedProposalV3Cost,
      v3Justification: item?.v3Justification.trim(),
    }]
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '25%',
            data: {
              message: 'Are you sure you want to UnLock ?',
            }
  })
      
  dialogRef.afterClosed().subscribe(res =>{
    if(res){
        this.api.postFinalProposelV3(temp, this.common.proposalRequestForUnlockByUserV3).subscribe((res) => {
          this.notification.showSuccessMessage(`${item?.aisheCode} has been Unlock successfully!!!`);
          this.collegeList();
          // this.getConsolidate()
      });
    }
  
  })
  
  
  
  
  }

  // unlock(unlockId, RemarksValue) {
  //   if (RemarksValue === "ViewRemarks") {
  //     let data = {
  //       aisheCode: unlockId.aisheCode,
  //       remarks: unlockId.remarksForRevisedProposalRequestForUnlockByUser,
  //       stateCode: unlockId.stateCode,
  //       stateName: unlockId.stateName,
  //       componentId: unlockId.componentId,
  //       paramId: this.revision,
  //       RemarksValue: RemarksValue,
  //       institutationName: unlockId.instituteName,
  //       proposalRevisionApprovedBySaa: unlockId.proposalRevisionApprovedBySaa
  //     }
  //     this.common.partialUnlockRevisionV3(data).subscribe(res => {
  //       if (res) {
  //         this.notification.showSuccessMessage(`${unlockId.aisheCode} has been Unlock successfully!!!`);
  //         this.collegeList();
  //       }
  //     })
  //   }
  //   else {
  //     let characters: string;
  //     if (
  //       unlockId.componentId === this.sharedService.collegeComponentId ||
  //       unlockId.componentId === this.sharedService.meruComponentId ||
  //       unlockId.componentId === this.sharedService.universityComponentId
  //     ) {
  //       characters = unlockId.aisheCode.split(/[\W\d]+/).join("");
  //     } 
  //     else if (unlockId.componentId === this.sharedService.genderComponentId) {
  //       characters = 'E';
  //     } 
  //     else {
  //       characters = 'N'; // fallback in case no condition matches
  //     }

  //     let data = {
  //       aisheCode: unlockId.aisheCode,
  //       districtCode: unlockId.districtCode,
  //       stateCode: unlockId.stateCode,
  //       stateName: unlockId.stateName,
  //       componentId: unlockId.componentId,
  //       paramId: this.revision,
  //       status: false,
  //       institutationName: unlockId.instituteName,
  //       v3Justification: unlockId.v3Justification,
  //       id: unlockId.id,
  //       revisedProposalV3Cost: unlockId.revisedProposalV3Cost
  //     }
  //     this.common.partialUnlockRevisionV3(data).subscribe(res => {
  //       if (res) {
  //         this.collegeList();
  //       }
  //     })
  //   }

  // }
  getStateList() {
    let payload = {
      stateCode: 'ALL',
      reviseProposalOrInitial: false
    }
    this.getService.saaForwardedFinalProposal(payload).subscribe(res => {
      this.variables = res.data;
      this.variables = this.variables.sort((a, b) => a.stateName > b.stateName ? 1 : -1);
      this.stateList = this.variables.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDistrict(data: any) {
    this.filterDistrictList = [];
    this.districtList = [];
    this.districtId = 'ALL';
    if (data === 'ALL') {
      return;
    }
    this.masterService.getDistrictList(data === 'ALL' ? '' : data).subscribe(res => {
      this.districtList = res;
      this.filterDistrictList = this.districtList.slice();

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.collegeListData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.collegeListData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.collegeListData.length - 1);
    }

  }

  clear() {
    this.isSearchClicked = false;
    if(this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id){
      this.stateId = 'ALL'
    }
    
    this.collegeListData = [];
    this.tempList = [];
    this.searchText = ''
    this.districtId = 'ALL'
    this.filterDistrictList = [];
    this.districtList = [];
    this.componentId = 'ALL'
    if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
      this.consultantUserId = sessionStorage.getItem('userName')
    } else {
      this.consultantUserId = 'ALL'
    }
    this.status = 'ALL',
      this.allotment = 'ALL'
    this.pabActionId = 'ALL'
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    sessionStorage.setItem('filteredStatus', this.status)
    sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    sessionStorage.setItem('filteredActionStatus', this.pabActionId)
  }

  async updateResults() {
    this.collegeListData = []
    this.collegeListData = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.instituteName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.instituteType?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.affiliatingUniversityName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.componentName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.v3LockedOnString?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.revisedProposalV3Cost?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }

  onSortClick(event, colName) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr(colName);
  }

  sortArr(colName: any) {
    this.collegeListData.sort((a, b) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a?.localeCompare(b) * this.sortDir;
    });
  }
  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('consultantComment', ele.consultantComment),
    sessionStorage.setItem('consultantUserName', ele.consultantUserId)
    sessionStorage.setItem('pmushaUniqueCode', 'RemarkView')
    sessionStorage.setItem('districtCodeGender', ele.districtCode);
    sessionStorage.setItem('districtNameNMDC', ele.districtName);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('componentId', ele.componentId);
    sessionStorage.setItem('componentIdV', ele.componentId);
    sessionStorage.setItem('filteredComponentId', this.componentId)
    if(ele.componentId == 5){
    this.router.navigate([this.routers.viewEquityNMDCRevisionV3, ele.componentId])

    }
    else{
    this.router.navigate([this.routers.viewMeruCollegeUniversityRevisionV3, ele.componentId])
       }   
     
  }

  openScore(data: any) {
    this.common.scoreBreakup(data);
  }

  openCost(data: any) {
    this.common.costBreakup(data, '');
  }
  collegeList() {
   

    this.isSearchClicked = true;
    let consultantUserId = ''
    if (this.consultantUserId === 'ALL') {
      consultantUserId = ''
    } else {
      consultantUserId = ''
      // consultantUserId = this.consultantUserId
    }
    let status = ''
    if (this.status === 'ALL') {
      status = ''
    } else {
      status = this.status
    }
    let allotmentStatus = ''
    if (this.allotment === 'ALL') {
      allotmentStatus = ''
    } else {
      allotmentStatus = this.allotment
    }

    let pabActionStatus = ''
    if (this.pabActionId === 'ALL') {
      pabActionStatus = '';
    }
    else if (this.pabActionId == 'Pending') {
      pabActionStatus = '';
    }
    else {
      pabActionStatus = this.pabActionId;
    }
    let payload = null

      payload = {
        stateCode: this.stateId === 'ALL' || this.stateId === null ? null : this.stateId,
        componentId: this.componentId === 'ALL' || this.componentId === null ? '' : this.componentId,
        districtCode: this.districtId === 'ALL' ? null : this.districtId,
        consultantUserId: '',
        scrutinyStatus: status,
        allotmentStatus: allotmentStatus,
        pabActionId: pabActionStatus,
        isSaaApproved: true,
        finalReviseProposalLockStatus: true
      }
    
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    sessionStorage.setItem('filteredStatus', this.status)
    sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    sessionStorage.setItem('filteredActionStatus', this.pabActionId)
    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      this.collegeListData = res.data;
      this.collegeListData = this.collegeListData.filter(e => e.pabActionId == 1 || e.pabActionId == 3)
      // this.collegeListData = this.collegeListData.filter(e => e.isV3Locked == true)
      // if (this.pabActionId == 'Pending') {
      //   this.collegeListData = this.collegeListData.filter(e => e.pabActionId === null)
      // }
    if(this.userTypeId == this.sharedService.userTypeList['1'].id || this.userTypeId == this.sharedService.userTypeList['2'].id){
        this.collegeListData = this.collegeListData.filter(e => e.isV3Locked == true)
        this.collegeListData = this.collegeListData.map((v) => ({
          ...v,
          checked: false,
        }));
      }
     

      else if ((this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id) && this.revision === this.sharedService.revPrposalV3) {
        this.collegeListData = this.collegeListData.filter(e => e.isV3ForwardedToNpd)
      }
      this.tempList = [...this.collegeListData]
      this.handlePageChange(this.sharedService.page = 1)
    });
  }

  getPABDropValue() {
    this.masterService.getNPDAction().subscribe(res => {
      if (res && res.length) {
        this.UpdatedropList = res;
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }


  toggleSelectAll(checked: boolean): void {
    for (let index = 0; index < this.collegeListData.length; index++) {
      if (checked) {
        this.collegeListData[index].checked = true;
      } else {
        this.collegeListData[index].checked = false;
      }

    }
  }
  mergeAllot() {
    let finalProposalStatusId = [];
    for (let i = 0; i < this.collegeListData.length; i++) {
      if (this.collegeListData[i].checked && this.collegeListData[i].consultantStatus) {
        this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
        return;
      } if (this.collegeListData[i].checked) {
        finalProposalStatusId.push(this.collegeListData[i].id)
      }
    }
    // this.collegeListData.forEach(element => {
    //   if(element.checked && element.consultantName){

    //   }
    //   if (element.checked) {
    //     finalProposalStatusId.push(element.id)
    //   }
    // });
    if (finalProposalStatusId.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    let data = {
      userList: this.userList,
      finalProposalStatusId: finalProposalStatusId,
      componentId: this.componentId,
      stateCode: this.stateId === 'ALL' ? null : this.stateId
    }
    this.common.mergeConsultant(data).subscribe((res: any) => {
      if (res) {
        this.collegeList()
      }
    })
  }

  PABMultiAllot() {
    let finalProposalStatusId = [];
    for (let i = 0; i < this.collegeListData.length; i++) {
      // if (this.collegeListData[i].checked && this.collegeListData[i].consultantStatus) {
      //   this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
      //   return;
      // }
      if (this.collegeListData[i].checked) {
        finalProposalStatusId.push(this.collegeListData[i].id)
      }
    }
    // this.collegeListData.forEach(element => {
    //   if(element.checked && element.consultantName){

    //   }
    //   if (element.checked) {
    //     finalProposalStatusId.push(element.id)
    //   }
    // });
    if (finalProposalStatusId.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    let data = {
      id: finalProposalStatusId,
      pabActionId: '',
      pabRemarks: ''
    }
    this.pabRemark(data, 'EditMulti')
    // this.common.mergeConsultant(data).subscribe((res: any) => {
    //   if (res) {
    //     this.collegeList()
    //   }
    // })
  }
  remarks(item) {
    this.common.remarks(item).subscribe(res => {
      if (res) {
        this.collegeList()
      }
    })
  }

  pabRemark(item, valueKey) {
    this.common.pabRemark(item, valueKey).subscribe(res => {
      if (res) {
        this.collegeList()
      }
    })
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem('back')
    sessionStorage.removeItem('addRemarks');
    // sessionStorage.removeItem('filterdata')
    // sessionStorage.removeItem('filteredStateCode')
    // sessionStorage.removeItem('filteredComponentId')
    // sessionStorage.removeItem('filteredDistrictCode')
    // sessionStorage.removeItem('filteredConsultantUserId')
    // sessionStorage.removeItem('filteredStatus')
    // sessionStorage.removeItem('filteredAllotmentStatus')
  }

  openUnlockMsg(data: any) {
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id) {
      if (data.isSaaApproved) {
        this.notification.showValidationMessage('This institute is Already Shortlisted for Approval');
        return;
      }

    }
    if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id) {
      if (data.isNpdApproved) {
        this.notification.showValidationMessage('This institute is Already Approved');
        return;
      }

    }
    data['page'] = false
    data['pageSAA'] = false
    this.common.unLock(data).subscribe(res => {
      if (res) {
        this.collegeList();
      }
    });
  }

clearSearch() {
  this.searchText = '';
  this.updateResults(); // manually trigger filter
}

 exportToExcel() {
      if (this.collegeListData.length != 0) {
          const state = this.collegeListData.find(item => item.stateCode === this.stateId);

          if (state) {
            this.stateName = state?.stateName;
          }
          if (this.componentId == this.sharedService.collegeComponentId) {
            let custom_data = this.collegeListData.map((item, index) => ({
              'S.No': index + 1,
              'Aishe Code': item.aisheCode,
              'Institution Name': (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.instituteName,
              'Type': item.instituteType,
              'Affiliated University': `${item.affiliatingUniversityName} (U-${item.affiliatingUniversityId})`,
              'Component Name': item.componentName,
              'State': item.stateName,
              'District': item.districtName,
              'Submitted On': item.v3LockedOnString,
              'Revised Total Cost': +item?.revisedProposalV3Cost,
              'Forward to NPD': item?.isV3ForwardedToNpd ? "Yes" : "No",
            }))
             let fileNamePrefix = '';
              if (this.componentId == this.sharedService.collegeComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Strengthen College';
              } else if (this.componentId == this.sharedService.universityComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Strengthen University';
              } else if (this.componentId == this.sharedService.meruComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Multi-disciplinary Education and Research';
              } 
              else {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report';
              }
              // else if (this.componentId == this.sharedService.genderComponentId) {
              //   fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Gender Inclusion & Equity Initiatives';
              // } else if (this.componentId == this.sharedService.nmdcComponentId) {
              //   fileNamePrefix = 'Re-Revision Proposal Monitoring Report of New Model Degree Colleges';
              // }
              const fileName = `${fileNamePrefix}_${this.stateName === 'null' || this.stateName === undefined ? 'ALL' : this.stateName}`;
              this.excelService.exportToExcel(custom_data, fileName);
          }
          else {
            let custom_data = this.collegeListData.map((item, index) => ({
              'S.No': index + 1,
              'Aishe Code': item.aisheCode,
              'Institution Name': (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.instituteName,
              'Component Name': item.componentName,
              'State': item.stateName,
              'District': item.districtName,
              'Submitted On': item.v3LockedOnString,
              'Revised Total Cost': +item?.revisedProposalV3Cost,
              'Forward to NPD': item?.isV3ForwardedToNpd ? "Yes" : "No",
            }))
             let fileNamePrefix = '';
              if (this.componentId == this.sharedService.collegeComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Strengthen College';
              } else if (this.componentId == this.sharedService.universityComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Strengthen University';
              } else if (this.componentId == this.sharedService.meruComponentId) {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Multi-disciplinary Education and Research';
              } 
              else {
                fileNamePrefix = 'Re-Revision Proposal Monitoring Report';
              }
              // else if (this.componentId == this.sharedService.genderComponentId) {
              //   fileNamePrefix = 'Re-Revision Proposal Monitoring Report of Gender Inclusion & Equity Initiatives';
              // } else if (this.componentId == this.sharedService.nmdcComponentId) {
              //   fileNamePrefix = 'Re-Revision Proposal Monitoring Report of New Model Degree Colleges';
              // }
              const fileName = `${fileNamePrefix}_${this.stateName === 'null' || this.stateName === undefined ? 'ALL' : this.stateName}`;
              this.excelService.exportToExcel(custom_data, fileName);
          }
      
    } else {
      this.notification.showValidationMessage("No Data Found");
    }
   }

trackById(index: number, item: any) {
  return item.id;
}
}

