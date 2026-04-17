import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { PmushaService } from '../ipmr/service/pmusha.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'cfs-target-achievement-summary',
  templateUrl: './target-achievement-summary.component.html',
  styleUrls: ['./target-achievement-summary.component.scss']
})
export class TargetAchievementSummaryComponent implements OnInit {
arrYears:any = [
  // {id: 2024,year : "2024-25" },
  {id: 2025,year : "2025-26" },
  // {id: 2026,year : "2026-27" }
  ]
  baseQuarterList :any = [
  { id: 1, quater: 'Q1 (1 Apr - 30 Jun)' },
  { id: 2, quater: 'Q2 (1 Jul - 30 Sep)' },
  { id: 3, quater: 'Q3 (1 Oct - 31 Dec)' },
  { id: 4, quater: 'Q4 (1 Jan - 31 Mar)' }]
quaterList:any[] = []
  selectedIndex: any
 panelOpenState = true;
     basicDetailsEditView = true;
     public routers: typeof routes = routes;
     aisheCode: any;
     instituteCategory: any;
     documentOfDpr: string;
     myFiles: any[];
     myFilesName: string;
     uploadedMedia: any[];
     fileSizeExceed: boolean;
     blob: any;
     tab: any
     componentId: any;
     insType: string;
     stateCode: any = 'ALL';
     organogramDoc: any;
     organogramFile: any;
     districtCode: any;
     addRemarks: any
     userTypeId: string;
     consultantRemarks: string;
     propOutcomeData: Array<any> = [];
     basicNaacScoreDetails: any;
     userId: string;
     userName:any;
     consultantUserId: string;
     basicNaacDistrictCode: any;
     studentTeacherRatio: any;
     assignView:boolean=false
     pmushaUniqueCode: number;
     hiddenValue:boolean=true;
     infraConstructionList: any;
     itemList: any[];
     renovatedList: any;
     equipmentList: any;
     softComponentList: any;
     targetNumber: any;
     getpropOutcomeData: any;
     instituteName: string;
     getremarkData:  any[]=[];
     arrMonths: any = [];
     instuteNameUpdate: any;
     monthList: any[];
     month: string = "4";
     modiefiedMonth: any;
     year:any = "2024";
     isView: boolean = false;
     variables: Array<any> = [];
     otherDPRReviseData: any;
     myFilesNameDpr: any;
     documentUpload: any;
     tabIndex:any;
     filterStateListArr: Array<any> = [];
     stateListArr: Array<any> = [];
     stateName:any = 'ALL';
     componentList:Array<any> =[];
     componetName:any;
     stateList2: any;
     filterStateList: any;
     meruOutcomeData:Array<any> = [];
     univOutcomeData:Array<any> = [];
     collegeOutcomeData:Array<any> = [];
     equityOutcomeData:Array<any> = [];
     nmdcOutcomeData:Array<any> = [];
     groupedData: any[] = [];
     selectedStateCode: any;
     meruTemplateArr: any;
     univeTemplateArr: any;
     collegeTemplateArr: any;
     equityTemplateArr: any;
     meruId: any;
     univId: any;
     collegeId: any;
     equityId: any;
     nmdcId: any;
     OutcomeIndicator13: any;
     OutcomeIndicator15: any;
     TotalPaperPublished: any;
     TotalPaperPublishedBaseYear: any;
     TotalPaperPublishedTarget31032024: any;
     TotalPaperPublishedTarget31032025: any;
     TotalPaperPublishedTarget31032026: any;
     ClosePannel: boolean = false;
     isPanelOpenMulti: boolean;
     isPanelOpenUniv:boolean;
     isPanelOpenCollege:boolean;
     isPanelOpenGender:boolean;
     isPanelOpenNMDC:boolean;
     componetNameFilter: any;
     componentShowMeru:boolean = true;
     componentShowUniv:boolean = true;
     componentShowCollege:boolean = true;
     componentShowEquity:boolean = true;
     componentShowNMDC:boolean = true;
     instituteList: any[];
     instuteShow: boolean;
     districtShow: boolean;
     DistrictList: any;
     instituteNameFilter: any;
     districtNameFilter: any;
     filterInstituteList: Array<any> = [];
     DistrictListFilter: Array<any> = [];
     instuteInformation: any[];
     instuteaisheCode: any;
     instuteCatogory: any;
     instuteName: any;
     NameOfDistrict: any;
     NameOfState: any;
     instituteMeruList: any[];
     collegeList: any[];
     instituteUnivList: any[];
     DistrictEquityList: any;
   isDisable: boolean;
   targetForm: FormGroup;
   targetCategoryArr:any = []
   achievementCategoryArr:any = []
     constructor(public api: ApiService, public dialog: MatDialog, public common: Common, public sharedService: SharedService, public router: Router, private fb : FormBuilder,
       public masterService: MasterService, public getService: GetService, public postService: PostService, public notification: NotificationService, private route: ActivatedRoute, public getpmService: PmushaService) {}

  ngOnInit(): void {
     this.targetForm = this.fb.group({
            id: [0],
            aisheCode: [''],
            stateId: [''],
            districtId: [''],
            financialYear: [''],
            financialQuarter : [''],
     })
  }

   tabSelected(value: MatTabChangeEvent) {}



   selectedYear(year: any) {
  const startYear = Number(year.value);
  this.quaterList = this.baseQuarterList.map(q => {
    const fyStart = q.id === 4 ? startYear + 1 : startYear;
    const fyEnd = fyStart + 1;

    return {
      ...q,
      quater: `${q.quater}`
    }; 
});
}

Find(category){
if(category == 'T'){
this.getTargetReport()
}
else{
this.getAchievementReport()
}
}




    getTargetReport(){
       let payload:any = {
      financialYear : this.targetForm.get("financialYear")?.value,
      financialQuarter : this.targetForm.get("financialQuarter")?.value,
        }
      this.getService.getTargetReport(payload).subscribe(res =>{
        this.targetCategoryArr = res
      })
    }

     getAchievementReport(){ 
       let payload:any = {
      financialYear : this.targetForm.get("financialYear")?.value,
      financialQuarter : this.targetForm.get("financialQuarter")?.value,
        }
      this.getService.getAchivementReport(payload).subscribe(res =>{
        this.achievementCategoryArr = res
        this.getMoocReport()
      })
    }


    getMoocReport(){
      let payload:any = {
      financialYear : this.targetForm.get("financialYear")?.value,
      financialQuarter : this.targetForm.get("financialQuarter")?.value,
        }
      this.getService.getMoocReport(payload).subscribe(res =>{
        this.achievementCategoryArr  = this.achievementCategoryArr.map(item => ({
          ...item,
        'offeringMooc' : res[0].distinctCourseOfferedAchievement + res[0].distinctCourseOfferedTarget
        }))
    })
  }

  exportExcel(data){
    if(data == 't'){
      var table = document.getElementById("targetTable");
        let workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
        XLSX.writeFile(workbook, "target-report.xlsx");  
      }
      else{
      var table = document.getElementById("achievementTable");
      let workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
      XLSX.writeFile(workbook, "achievement-report.xlsx");
      }

  }
}
