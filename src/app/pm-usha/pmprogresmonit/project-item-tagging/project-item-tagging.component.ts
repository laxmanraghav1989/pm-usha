import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { ExcelService } from 'src/app/service/excel.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cfs-project-item-tagging',
  templateUrl: './project-item-tagging.component.html',
  styleUrls: ['./project-item-tagging.component.scss']
})
export class ProjectItemTaggingComponent implements OnInit {
  public routers: typeof routes = routes;
  collegeListData: any[] = [];
  tempList: any[] = [];
  searchText: any;
  stateCode: string;
  userTypeId: string;
  componentId: any = 'ALL';
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
  reRevisionFlag:any;
  componentList: Array<any> = [{id: 1, componentName: 'Multi-Disciplinary Education and Research Universities (MERU)'},
    {id: 2, componentName: 'Grants to Strengthen Universities (Accredited & Unaccredited Universities)'},
    {id: 3, componentName: 'Grants to Strengthen Colleges (Accredited & Unaccredited Colleges)'},
    {id: 5, componentName: 'Gender Inclusion and Equity Initiatives'}]
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService,
    public sharedService: SharedService, public router: Router, private route: ActivatedRoute, public getService: GetService, public postService: PostService, public encrypt: EncryptDecrypt, private excelService: ExcelService, private dialog : MatDialog) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.isProposalRevisionEsignDone = Boolean(this.encrypt.getDecryptedValue(sessionStorage?.getItem('isProposalRevisionEsignDone')));
    this.isEsignDoneEquity = Boolean(this.encrypt.getDecryptedValue(sessionStorage?.getItem('isEsignDoneEquity')));
    this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id
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
    }
    this.addRemarks = sessionStorage.getItem('addRemarks');
 
   
  }
  ngOnInit(): void {
    
    
    this.getStateList();
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.pmUsha = this.route.snapshot.paramMap.get('pm-usha');
    this.revision = Number(this.route.snapshot.paramMap.get('revision'));
   
    if (sessionStorage.getItem('back') === 'true') {

      this.stateId = sessionStorage.getItem('filteredStateCode')
      this.getDistrict(this.stateId);
      // this.componentId = +sessionStorage.getItem('filteredComponentId')
      const compVal = Number(sessionStorage.getItem('filteredComponentId'));
      this.componentId = isNaN(compVal) || compVal === 0 ? 'ALL' : compVal;
      this.districtId = sessionStorage.getItem('filteredDistrictCode')
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

  unlock(unlockId, RemarksValue) {
    if (RemarksValue === "ViewRemarks") {
      let data = {
        aisheCode: unlockId.aisheCode,
        remarks: unlockId.remarksForRevisedProposalRequestForUnlockByUser,
        stateCode: unlockId.stateCode,
        stateName: unlockId.stateName,
        componentId: this.componentId,
        paramId: this.revision,
        RemarksValue: RemarksValue,
        institutationName: unlockId.instituteName,
        proposalRevisionApprovedBySaa: unlockId.proposalRevisionApprovedBySaa
      }
      this.common.partialUnlockRevision(data).subscribe(res => {
        if (res) {
          this.notification.showSuccessMessage(`${unlockId.aisheCode} has been Unlock successfully!!!`);
          this.collegeList();
        }
      })
    }
    else {
      let characters = unlockId.aisheCode.split(/[\W\d]+/).join("");
      let data = {
        aisheCode: unlockId.aisheCode,
        districtCode: unlockId.districtCode,
        stateCode: unlockId.stateCode,
        stateName: unlockId.stateName,
        componentId: this.componentId,
        constant: this.common.RevisionUnlockConstantAdmin,
        instituteCategory: characters,
        paramId: this.revision,
        status: false,
        RemarksValue: RemarksValue,
        institutationName: unlockId.instituteName,
        proposalRevisionApprovedBySaa: unlockId.proposalRevisionApprovedBySaa
      }
      this.common.partialUnlockRevision(data).subscribe(res => {
        if (res) {
          this.collegeList();
        }
      })
    }

  }


    unlockTag(itemValue) {
          // All conditions are met, proceed with the API call
      let payload = {
        "proposalItemTaggingStatus": false,
        "componentId": itemValue.componentId,
        "aisheCode": itemValue.aisheCode,
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '25%',
              data: {
                message: 'Are you sure you want to UnLock ?',
              }
            })
            dialogRef.afterClosed().subscribe(res =>{
              if(res){
                this.postService.lockTagging(payload).subscribe(res => {
                  if (res.status === 200) {
                      this.notification.showSuccessMessage("Final Proposal item tagging status Unlock Successfully");
                      this.collegeList()
                          // this.getLock1();
                    }
                    }, err => {
                        // Handle error here if needed
                    });
              }})

    
    }  
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
    this.districtId = null
    if (data === 'ALL') {
      this.districtId = 'ALL'
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
    this.stateId = 'ALL';
    this.collegeListData = [];
    this.tempList = [];
    this.searchText = '';
    this.districtId = 'ALL';
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
          || (item.address?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.dateFinalSubmission?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalScore?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalCost?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }

 clearSearch() {
  this.searchText = '';
  this.updateResults(); // manually trigger filter
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
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('componentIdV', ele.componentId);
    sessionStorage.setItem('addRemarks', 'true');
    sessionStorage.setItem('consultantComment', ele.consultantComment),
    sessionStorage.setItem('consultantUserName', ele.consultantUserId)
    sessionStorage.setItem('pmushaUniqueCode', 'RemarkView')
     this.router.navigate([this.routers.viewinstProjectTag, ele.componentId, this.sharedService.projectTaggingId, ele.id, ele.stateCode])
    if (ele.componentId === this.sharedService.collegeComponentId) {
      this.router.navigate([this.routers.viewinstProjectTag, ele.componentId, this.sharedService.projectTaggingId, ele.id, ele.stateCode])
    }
    else if (ele.componentId === this.sharedService.universityComponentId) {
      this.router.navigate([this.routers.viewinstUniverProjectTag, ele.componentId, this.sharedService.projectTaggingId, ele.id, ele.stateCode])
    }
    else if (ele.componentId === this.sharedService.meruComponentId) {
      this.router.navigate([this.routers.viewinstMeruProjectTag, ele.componentId, this.sharedService.projectTaggingId, ele.id, ele.stateCode])
    }
    else {
      this.router.navigate([this.routers.viewinstGenderProjectTag, ele.componentId, this.sharedService.projectTaggingId, ele.id, ele.stateCode, ele.districtCode])
    }

  }

  openScore(data: any) {
    this.common.scoreBreakup(data);
  }

  openCost(data: any) {
    this.common.costBreakup(data, '');
  }
  collegeList() {
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
        scrutinyStatus: '',
        allotmentStatus: '',
        pabActionId: '',
        isSaaApproved: true,
        finalReviseProposalLockStatus: true,
        isV3ForwardedToNpd: this.reRevisionFlag === 'ALL' || this.reRevisionFlag === undefined ? '' : this.reRevisionFlag 
      }
    // sessionStorage.setItem('filteredStateCode', this.stateId)
    // sessionStorage.setItem('filteredComponentId', this.componentId)
    // sessionStorage.setItem('filteredDistrictCode', this.districtId)
    // sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    // sessionStorage.setItem('filteredStatus', this.status)
    // sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    // sessionStorage.setItem('filteredActionStatus', this.pabActionId)
    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      this.collegeListData = res.data;
      this.collegeListData = this.collegeListData.filter(e => e.pabActionId == 1 || e.pabActionId == 3)
      this.collegeListData = this.collegeListData.filter(e => e.revisedProposalForwardedtoNpd)
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

   exportToExcel() {
      if (this.collegeListData.length != 0) {
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
              'Submitted On': item.proposalItemTaggingDateTime,
              'Re-Revision Proposal': item?.isV3ForwardedToNpd ? "Yes" : "No",
              'Project Tagging Status': item?.proposalItemTaggingStatus ? "Submitted" : "Not Submitted",
            }))
             let fileNamePrefix = '';
              if (this.componentId == this.sharedService.collegeComponentId) {
                fileNamePrefix = 'Project Tagging of Strengthen College';
              } else if (this.componentId == this.sharedService.universityComponentId) {
                fileNamePrefix = 'Project Tagging of Strengthen University';
              } else if (this.componentId == this.sharedService.meruComponentId) {
                fileNamePrefix = 'Project Tagging of Multi-disciplinary Education and Research Universities';
              } else if (this.componentId == this.sharedService.genderComponentId) {
                fileNamePrefix = 'Project Tagging of Gender Inclusion & Equity Initiatives';
              }

              const fileName = `${fileNamePrefix}_${this.stateId === 'null' ? 'ALL' : this.stateId}`;
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
              'Submitted On': item.proposalItemTaggingDateTime,
              'Re-Revision Proposal': item?.isV3ForwardedToNpd ? "Yes" : "No",
              'Project Tagging Status': item?.proposalItemTaggingStatus ? "Submitted" : "Not Submitted",
            }))
             let fileNamePrefix = '';
              if (this.componentId == this.sharedService.collegeComponentId) {
                fileNamePrefix = 'Project Tagging of Strengthen College';
              } else if (this.componentId == this.sharedService.universityComponentId) {
                fileNamePrefix = 'Project Tagging of Strengthen University';
              } else if (this.componentId == this.sharedService.meruComponentId) {
                fileNamePrefix = 'Project Tagging of Multi-disciplinary Education and Research Universities';
              } else if (this.componentId == this.sharedService.genderComponentId) {
                fileNamePrefix = 'Project Tagging of Gender Inclusion & Equity Initiatives';
              }

              const fileName = `${fileNamePrefix}_${this.stateId === 'null' ? 'ALL' : this.stateId}`;
              this.excelService.exportToExcel(custom_data, fileName);
          }
      
    } else {
      this.notification.showValidationMessage("No Data Found");
    }
   }

trackById(index: number, item: any) {
  return item.id;
}

view(item) {
    let temp = {
      documentId: item.documentId,
      // documentTypeId: item.documentTypeId,
    }
    this.getService.viewTagDocument(temp).subscribe((res) => {
      if (res) {
        this.viewPdfInNewTab(res.data[0].documentFile, res.data[0].name)
      }
    })
  }

  downloadFile(item){
    let temp = {
      documentId: item.documentId,
      // documentTypeId: item.documentTypeId,
    }
    this.getService.viewTagDocument(temp).subscribe((res) => {
      if (res) {
        this.downloadPdf1(res.data[0].documentFile, res.data[0].name)
      }
    })
  }

  viewPdfInNewTab(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);
  
    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  
    // Optionally, revoke the object URL after some time to free memory
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
  downloadPdf1(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);

    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName; // You can set the filename here
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  base64ToUint8Array(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

}
