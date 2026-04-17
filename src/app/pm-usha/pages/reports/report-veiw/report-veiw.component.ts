import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import { routes } from 'src/app/routes';
import * as XLSX from 'xlsx-js-style';
import { PmushaService } from 'src/app/pm-usha/ipmr/service/pmusha.service';

@Component({
  selector: 'cfs-report-veiw',
  templateUrl: './report-veiw.component.html',
  styleUrls: ['./report-veiw.component.scss']
})
export class ReportVeiwComponent implements OnInit {
  @Input() item:any;

  public routers: typeof routes = routes;
  indexId:any;
  stateName:string;
  stateId: string;
  componentId: any;
  districtId: any;
  status:any;
  templateData:any = []
  collegeListArr:any = []
  StartLimit:any = 0;
  userTypeId:any;   
  revision: any;
  dprStatus:boolean = true;
  tab: Window;
  paramId: number;
  pabNumber:any;
  tooltipPosition: 'above' | 'below' | 'left' | 'right' = 'above';
  constructor( public getService: GetService, public sharedService : SharedService, public router: Router, private route: ActivatedRoute, public getpmService: PmushaService) {

    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
   }

   formatToCrores(value: number): string {
    const crores = Math.floor((value / 10000000) * 100) / 100; // Truncate to 2 decimal places
    return `${crores.toFixed(2)} Cr`;
  }
  ngOnInit(): void {
    this.indexId = this.route.snapshot.paramMap.get('id')
    this.sharedService.getViewReportDetails.subscribe(res =>{
      if(res == 0){
        this.router.navigate([this.routers.Reports])  
      }
      else{
        this.stateId = res[0].statecode
        this.componentId = res[0].componentid
        this.status = res[0].status
        this.stateName = res[0].statename
        this.dprStatus = res[0].status == 'DA' ? false : res[0].status == 'RA' ? false : res[0].status == 'RGA' ? false : res[0].status == 'U' ? false : res[0].status == 'D' ? false : res[0].status == 'TA' ? false : res[0].status == 'TRA' ? false : res[0].status == 'TU' ? false : res[0].status == 'TD' ? false : true 
        this.pabNumber = Number.isNaN(res[0].pabNumber) ? null : res[0].pabNumber
      }

    
    })


    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.revision = Number(this.route.snapshot.paramMap.get('revision'));
    this.collegeList()
   

  }

  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.templateData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.templateData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.templateData.length - 1);
    }

  }


  




  backFnc(){
    sessionStorage.setItem('back','true')
    sessionStorage.setItem('pabNumber', this.pabNumber)
    this.router.navigate([this.routers.Reports])
  }

  collegeList() {
    let payload = {
        stateCode: this.stateId === 'ALL' ? null : this.stateId,
        componentId: this.componentId,
        districtCode: this.districtId ? this.districtId : null,
        pabNumber : this.pabNumber
      }
    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      if(res.status == 200){
        this.templateData =  res.data
      }
     
    
      if(this.status == 'A' || this.status == 'TOTAP'){
      this.collegeListArr = this.templateData.filter(e => e.pabActionId == 1 || e.pabActionId == 3);
        
    }


    


      // else if(this.status == 'S'){
      //   this.collegeListArr = this.templateData
      // }
      else if(this.status == 'S' || this.status == 'MST' || this.status == 'SUT' || this.status == 'SCT' || this.status == 'NDT' || this.status == 'GIT' || this.status === 'ALLSUB' || this.status === 'TOTS'){
        this.collegeListArr = this.templateData.filter(e => e.isSaaForwarded == true)
      }
      else if(this.status == 'DA' || this.status == 'MAT' || this.status == 'SAT' || this.status == 'SCAT' || this.status == 'NDAT' || this.status == 'GIAT' || this.status == 'ALLAPP'){
        this.collegeListArr = this.templateData.filter(e => e.pabActionId == 1 || e.pabActionId == 3);
      }
      else if(this.status == 'RA' || this.status == 'AR' || this.status == 'MATR' || this.status == 'SATR' || this.status == 'SCATR' || this.status == 'NDATR' || this.status == 'TOTAPREV'){
        this.collegeListArr = this.templateData.filter(e => (e.pabActionId == 1 || e.pabActionId == 3) && (e.revisedProposalForwardedtoNpd === true));
        this.collegeListArr = this.templateData.filter(e => (e.pabActionId == 1 || e.pabActionId == 3) && (e.revisedProposalForwardedtoNpd === true));
      }
      else if(this.status == 'RGA' || this.status == 'AGR' || this.status == 'GIATR' || this.status == 'ALLAPPREV'){
       var filter = this.templateData.filter(e => (e.pabActionId == 1 || e.pabActionId == 3));
        this.collegeListArr = this.templateData.filter(e => (e.pabActionId == 1 || e.pabActionId == 3) && (e.revisedProposalForwardedtoNpd === true));
      }
      else if(this.status == 'U'){
        this.collegeListArr = this.templateData.filter(currentValue => (currentValue.pabActionId == 1 || currentValue.pabActionId == 3) &&  (currentValue.revisedProposalForwardedtoNpd === true) && (currentValue.revisedProposalDprUndertaking === false || (currentValue.isRevisedProposalDprEsign === true && currentValue.isRevisedProposalRevisedDpr === true)) || currentValue.v3Dpr);
      }
      else if(this.status == 'D'){
        this.collegeListArr = this.templateData.filter(currentValue => (currentValue.pabActionId == 1 || currentValue.pabActionId == 3) && (currentValue.revisedProposalDprUndertaking === true && currentValue.revisedProposalForwardedtoNpd === true && currentValue.isRevisedProposalDprEsign == null));

      }
      else if(this.status == 'TA'){
        this.collegeListArr = this.templateData.filter(e => e.pabActionId == 1 || e.pabActionId == 3);
      }
      else if(this.status == 'TRA'){
        this.collegeListArr = this.templateData.filter(e => (e.pabActionId == 1 || e.pabActionId == 3) && (e.revisedProposalForwardedtoNpd === true || e.revisedProposalForwardedtoNpd === true));
      }
      else if(this.status == 'TU'){
       this.collegeListArr = this.templateData.filter(currentValue => (currentValue.pabActionId == 1 || currentValue.pabActionId == 3) &&  (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) && (currentValue.revisedProposalDprUndertaking === false || (currentValue.isRevisedProposalDprEsign === true && currentValue.isRevisedProposalRevisedDpr === true) || currentValue.v3Dpr));
      }
      else if(this.status == 'TD'){
        this.collegeListArr = this.templateData.filter(currentValue => (currentValue.pabActionId == 1 || currentValue.pabActionId == 3) && (currentValue.revisedProposalDprUndertaking === true && currentValue.revisedProposalForwardedtoNpd === true && currentValue.isRevisedProposalDprEsign == null));
      }
      this.handlePageChange(this.sharedService.page = 1)
      
  })



}




//////////////////////

excelDownload() {
  const wb = XLSX.utils.book_new();
  const data = this.getTableDataPab();
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

  const customHeader = this.createCustomHeaderPab();
  XLSX.utils.sheet_add_aoa(ws, customHeader, { origin: 'A1' });
 
  let merge = [];

  merge = [
    { s: { r: 0, c: 1 }, e: { r: 0, c: 1 } },
    { s: { r: 0, c: 2 }, e: { r: 0, c: 2 } },
    { s: { r: 0, c: 3 }, e: { r: 0, c: 3 } },
    { s: { r: 0, c: 4 }, e: { r: 0, c: 4 } },
   
   

  ];
  // Apply style and set values in the merged range
 



  // Add the merges property to the worksheet
  ws['!merges'] = merge;



  for (var i in ws) {
    if (typeof ws[i] != 'object') continue;
    let cell = XLSX.utils.decode_cell(i);

    ws[i].s = {
      // styling for all cells
      font: {
        name: 'arial',
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: '1', // any truthy value here
      },
      border: {
        right: {
          style: 'thin',
          color: '000000',
        },
        left: {
          style: 'thin',
          color: '000000',
        },
      },
    };
    if (cell.r == 0) {
      // first row
      ws[i].s.font = { bold: true, size: 8 };
      ws[i].s.border.bottom = {
        // bottom border
        style: 'thin',
        color: '000000',
      };
    }
 
    if (cell.r) {
      ws[i].s.border.bottom = {
        // bottom border
        style: 'thin',
        color: '000000',
      };
    }
    if (cell.r && cell.c == 1  || cell.r== 0 && cell.c==1) {
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'B8DAFF' },
        bgColor: { rgb: 'B8DAFF' },

      };
    }


    if (cell.r  && cell.c == 2 || cell.r== 0 && cell.c==2) {
      // every other row
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'D6D8DB' },
        bgColor: { rgb: 'D6D8DB' },
      };
    }
   

    if (cell.r && cell.c == 3 || cell.r== 0 && cell.c==3) {
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'C3E6CB' },
        bgColor: { rgb: 'C3E6CB' },
      };
    }
    if (cell.r  && cell.c == 4  || cell.r==0 && cell.c==4) {
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'BEE5EB' },
        bgColor: { rgb: 'BEE5EB' },
      };
    }
    if (cell.r  && cell.c == 5 || cell.r==0 && cell.c==5) {
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'B8DAFF' },
        bgColor: { rgb: 'B8DAFF' },
      };
    }

    if (cell.r && cell.c == 6 || cell.r==0 && cell.c==6) {
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'F5C6CB' },
        bgColor: { rgb: 'F5C6CB' },
      };
    }
   

    if (cell.r === this.collegeListArr.length + 2) {
      ws[i].s.font = { bold: true, size: 8 };
      ws[i].s.fill = {
        patternType: 'solid',
        fgColor: { rgb: 'C6BFB5' },
        bgColor: { rgb: 'C6BFB5' },
      };
    }
  }


  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, this.stateName+'-report.xlsx');
}

getTableDataPab(): any[][] {
const tableData = [['S.No.', 'Aishe Code', 'Institution Name', 'Component Name', 'State', 'District', 'PAB Status', 'Focus District', 'Is Aspirational District', 'Is Left Wing Extremist (LWE) District', 'Is Border Area District', 'Total Score', 'Is Eligible for Re-Revision', 'Is Re-Revised', 'Total Cost']];
const tableDataDPR = [['S.No.', 'Aishe Code', 'Institution Name', 'Component Name', 'State', 'District', 'PAB Status', 'Focus District', 'Is Aspirational District', 'Is Left Wing Extremist (LWE) District', 'Is Border Area District', 'PAB Number', 'PAB Date', 'DPR Status', 'Re-Revised DPR Status', 'Undertaking By']];
if(this.dprStatus == false){
  this.collegeListArr.forEach((element, i) => {
    tableDataDPR.push([
      i + this.StartLimit + 1,
      element.aisheCode,
      (element?.componentId === this.sharedService.genderComponentId || element?.componentId === this.sharedService.nmdcComponentId) ? element?.aisheCode : element?.instituteName,
      element.componentName,
      element.stateName,
      element.districtName,
      element.pabActionId === 1 || element.pabActionId === 3 ? 'Yes' : 'No',
      element.isFocusDistrict ? 'Yes' : 'No',
      element.aspirational ? 'Yes' : 'No',
      element.lweAffected ? 'Yes' : 'No',
      element.borderArea ? 'Yes' : 'No',
      element.pabNumber,
      element.pabDateInString,
      ((element.pabActionId == 1 || element.pabActionId == 3) &&  (element.revisedProposalForwardedtoNpd === true) && (element.revisedProposalDprUndertaking === false || (element.isRevisedProposalDprEsign === true && element.isRevisedProposalRevisedDpr === true))) ? 'Yes' : 'No',
      // element.isEligibleForV3 ? 'Yes' : 'No',
      element.isV3ForwardedToNpd ? 'Yes' : '',
      ((element.pabActionId == 1 || element.pabActionId == 3) && (element.revisedProposalDprUndertaking === true && element.revisedProposalForwardedtoNpd === true && element.isRevisedProposalDprEsign == null)) ? 'Yes' : 'No'   
    ]);
  });
  return tableDataDPR;
}
else{
  this.collegeListArr.forEach((element, i) => {
    tableData.push([
      i + this.StartLimit + 1,
      element.aisheCode,
      (element?.componentId === this.sharedService.genderComponentId || element?.componentId === this.sharedService.nmdcComponentId) ? element?.aisheCode : element?.instituteName,
      element.componentName,
      element.stateName,
      element.districtName,
      element.pabActionId === 1 || element.pabActionId === 3 ? 'Yes' : 'No',
      element.isFocusDistrict ? 'Yes' : 'No',
      element.aspirational ? 'Yes' : 'No',
      element.lweAffected ? 'Yes' : 'No',
      element.borderArea ? 'Yes' : 'No',
      element.totalScore,
      element.isEligibleForV3 ? 'Yes' : 'No',
      element.isV3ForwardedToNpd && element.revisedProposalV3Cost ? 'Yes' : '',
      (element.revisedProposalForwardedtoNpd && element.isV3ForwardedToNpd
                        ? element.revisedProposalV3Cost
                        : element.revisedProposalForwardedtoNpd
                            ? element.revisedTotalCost
                            : element.totalCost),
    ]);
  });
  return tableData;
  
}




}

createCustomHeaderPab(): any[][] {
let header: any[][];
if(this.dprStatus == false){
  header = [
    ['S.No.', 'Aishe Code', 'Institution Name', 'Component Name', 'State', 'District','PAB Status', 'Focus District', 'Is Aspirational District', 'Is Left Wing Extremist (LWE) District', 'Is Border Area District', 'PAB Number', 'PAB Date', 'DPR Status', 'Re-Revised DPR Status',  'Undertaking By']
  
  ];

}
else{
  header = [
    ['S.No.', 'Aishe Code', 'Institution Name', 'Component Name', 'State', 'District','PAB Status', 'Focus District', 'Is Aspirational District', 'Is Left Wing Extremist (LWE) District', 'Is Border Area District', 'Total Score', 'Is Eligible for Re-Revision', 'Is Re-Revised', 'Total Cost']
  
  ];
}



return header;
}




datailsList(ele: any): void {
  let componentId = ele.componentId
  let aiseCode = ele.aisheCode
  let tabIndex = this.indexId
  let districtCode = ele.districtCode
  if(componentId == '1'){
    this.router.navigate([this.routers.viewReportMeruRevision, componentId, aiseCode, tabIndex])
  }
  else if(componentId == '2' || componentId == '3'){
    this.router.navigate([this.routers.viewReportStrengthenRevision, componentId, aiseCode, tabIndex])
  }
  else if(componentId == '4' || componentId == '5'){
    this.router.navigate([this.routers.viewReportEquityRevision, componentId, aiseCode, tabIndex, districtCode])
  }

}



}





