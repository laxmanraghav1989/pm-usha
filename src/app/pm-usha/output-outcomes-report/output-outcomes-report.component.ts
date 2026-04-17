import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-output-outcomes-report',
  templateUrl: './output-outcomes-report.component.html',
  styleUrls: ['./output-outcomes-report.component.scss']
})
export class OutputOutcomesReportComponent implements OnInit {
  arrYears:any = [{id: 2024,year : "2024-25" },{id: 2025,year : "2025-26" },{id: 2026,year : "2026-27" }]
 gridApi: any;
  gridColumnApi: any;
  columnDefs: any = [];
  rowData: any = [];
  paginationPageSize = 10;
   searchText: any;
  paginationPageSizeSelector = [10, 20, 50];
   aisheCode: string;
  componentId: string;
  stateCode: string;
  districtCode: string;
  combinedArray:any =[]
  userTypeId:any;
  pabApproved: string;
  disabled:boolean = true
pabConditionallyApproved: string;
trueValues: string[];
selectedCheckBox:any =[]
trueValuesConditionally: string[];
isVisble:any = false
selectedRows:any;
userNpdTypeList:any;
   constructor(private getService : GetService, private fb : FormBuilder, private postService : PostService, private notification : NotificationService, private sharedService : SharedService, public router: Router, public dialog: MatDialog) {
   
    this.userTypeId = sessionStorage.getItem("userTypeId");
    this.aisheCode = sessionStorage.getItem("aisheCode");
      if(this.userTypeId == 2){
        this.stateCode = sessionStorage.getItem("stateCode")
    }
      this.districtCode = sessionStorage.getItem("districtCode")
      this.pabApproved = sessionStorage.getItem("pabApproved");
    this.pabConditionallyApproved = sessionStorage.getItem(
      "pabConditionallyApproved"
    );
    this.trueValues = this.extractTrueValue(this.pabApproved);
    this.trueValuesConditionally = this.extractTrueValue(
      this.pabConditionallyApproved
    );


     }
     

  ngOnInit(): void {
     this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id;
     this.componentId = this.trueValues[0]|| this.trueValuesConditionally[0]
     this.gridInit();
     this.getCombinedData()
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


  gridInit() {
    this.columnDefs = [
      {
          headerName: '',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          width: 60,
          hide: this.userTypeId != 2,
          onCellValueChanged: (params: any) => {
            }


        },

      {
        headerName: 'S.No.',
        field: '',
         width: '120',
        valueGetter: 'node.rowIndex + 1',
      },  
       {
        headerName: 'State',
        valueGetter: ({ data }) => data?.state?.name ?? '',
        filter : this.userNpdTypeList ? true : false
      },
       {
        headerName: 'Institution Name',
        valueGetter: ({ data }) => data?.details?.name ?? '', 
        filter : this.userNpdTypeList ? true : false,
        width: '200',
      
      },
      {
        headerName: 'Aishe Code',
        valueGetter: ({ data }) => data?.aisheCode ?? '',
        filter : this.userNpdTypeList ? true : false,
        // field: 'aisheCode',
         width: '120',
         cellRenderer: (params: any) => {
    return `
      <a href="javascript:void(0)"
         style="color:#1976d2; text-decoration:underline; cursor:pointer;">
        ${params.value}
      </a>
    `;
  },
   onCellClicked: (params: any) => {
      if(params.data.isTargetOrAchievement == 'T'){
          this.router.navigate(
        ['/app/outComesTarget'],
        { queryParams: { data: 'viewSection' } }
      );
        this.sharedService.postTargetAchievementData(params.data)
        sessionStorage.setItem('targetAchievementData', JSON.stringify(params.data));
      }  
   else{
        this.router.navigate(
        ['/app/outComesAchievement'],
       { queryParams: { data: 'viewSection' } }
      );
        this.sharedService.postTargetAchievementData(params.data)
        sessionStorage.setItem('targetAchievementData', JSON.stringify(params.data));
      } 




  }
      },
      {
        headerName: 'Component Name',
       valueGetter: ({ data }) => data?.component?.componentName ?? '',
       filter : this.userNpdTypeList ? true : false,
        width: '200',
      },
      
        {
        headerName: 'Financial Year',
        field: 'financialYear',
         filter: true,
      // suppressMenu: true
      },

      {
        headerName: 'Financial Quarter',
        field: 'financialQuarter',
      },

      {
        headerName: 'Data Category',
        filter: true,
       valueGetter: ({ data }) => data?.isTargetOrAchievement == 'A' ? 'Achievement' : 'Target'
      },
     
      ...(this.userTypeId == 2 ? [{
    headerName: 'Action',
    width: 240,
    cellRenderer: (params: any) => {
      return `
        <button data-action="unlock"
                title="Unlock"
                style="background:none;border:none;cursor:pointer;color:green;">
          <i class="material-icons">lock_open</i>
        </button>`;
    },
    onCellClicked: (params: any) => {
      const actionType = (params.event.target as HTMLElement)
        .closest('button')
        ?.getAttribute('data-action');

      if (actionType === 'unlock') {
          this.confirmDialog(params.data)
      }
    }
  }] : [])
    ];
    this.rowData = [];
  }
 
  defaultColDef: ColDef = {
    sortable: true,
    // filter: true,
    resizable: true,
    flex: 1,
    floatingFilter : true,
    // editable : true,

    getQuickFilterText: (params) => {
      // `params.value` is the cell value
      return params.value ? params.value.toString().toLowerCase() : '';
    },
  };




onSelectionChanged() {
  this.selectedRows = this.gridApi.getSelectedRows();
  this.selectedCheckBox = this.selectedRows.map(row => row.id);
  this.selectedRows.length > 0 ? this.disabled = false : this.disabled = true
}




confirmNPDDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25%',
        data: {
          message: 'Are you sure you want to Forwarded ?',

      }
    })
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed === true) {
      this.forwardedToNpd()
    }
  });
}



forwardedToNpd(){
 let lockOrForwarded = true;
  const targetPayload = this.selectedRows
    .filter((row: any) => row.isTargetOrAchievement === 'T')
    .map((row: any) => ({
      id: Number(row.id),
      isForwardedToNpd: true
    }));

  const achievementPayload = this.selectedRows
    .filter((row: any) => row.isTargetOrAchievement === 'A')
    .map((row: any) => ({
      id: Number(row.id),
      isForwardedToNpd: true
    }));

  if (targetPayload.length > 0) {
    this.postService
      .postQuarterlyTarget(targetPayload, lockOrForwarded)
      .subscribe(res => {
        if (res.status === 200) {
          this.getCombinedData();
          this.notification.showSuccessMessage(
            'Target forwarded to NPD successfully.'
          );
        }
      });
  }
  if (achievementPayload.length > 0) {
    this.postService
      .postAchievement(achievementPayload, lockOrForwarded)
      .subscribe(res => {
        if (res.status === 200) {
          this.getCombinedData();
          this.notification.showSuccessMessage(
            'Achievement forwarded to NPD successfully.'
          );
        }
      });
  }

}




 onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

  }

   exportExcel() {
    this.gridApi.exportDataAsCsv({
      fileName: 'output-outcomes-report.csv',
    });
  }


   getGridHeight(): string {
    const rowCount: any =
      this.rowData?.length == 0 ? 3 : this.paginationPageSize || 1;
    const rowHeight = 50; // default row height in px
    const headerHeight = 40;
    return `${headerHeight + rowCount * rowHeight}px`;
}


confirmDialog(data:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25%',
        data: {
          message: 'Are you sure you want to Un-Lock ?',

      }
    })
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed === true) {
      this.unLock(data);
    }
  });
}









unLock(data:any){
if(data.isTargetOrAchievement == 'T'){
    let lockOrForwarded = true
    let payload = [{
    id: Number(data.id) || 0,  
    lockStatus : false
    }]

    this.postService.postQuarterlyTarget(payload, lockOrForwarded).subscribe(res => {
    if(res.status == 200){
      this.notification.showSuccessMessage('Un-Locked Successfully.')
      this.getCombinedData()
    }
  })
}
else{

    let lockOrForwarded = true
    let payload = [{
    id: Number(data.id) || 0,  
    lockStatus : false
    }]

    this.postService.postAchievement(payload, lockOrForwarded).subscribe(res => {
    if(res.status == 200){
      this.notification.showSuccessMessage('Un-Locked Successfully.')
      this.getCombinedData()
    }
  })
}

}





  getCombinedData() {

  const achievementPayload: any = {
    aisheCode: "",
    componentId: "",
    financialYear: "",
    financialQuarter: "",
    stateCode: this.stateCode ? this.stateCode : '',
    districtCode: "",
  };

  const targetPayload: any = {
    aisheCode: "",
    componentId: "",
    financialYear: "",
    financialQuarter: "",
    stateCode: this.stateCode ? this.stateCode : '',
    districtCode: "",

  };


forkJoin({
   target: this.getService.getQuarterlyTarget(targetPayload),
    achievement: this.getService.getQuarterlyAchievement(achievementPayload)
   
  }).subscribe(res => {
    this.combinedArray = [
      ...res.achievement,
      ...res.target
    ];

    if(this.combinedArray.length > 0){
      if(this.userTypeId == 2){
        this.rowData = this.combinedArray.filter(item => item.lockStatus == true && item.isForwardedToNpd == false)
        this.rowData.length > 0 ? this.isVisble = true : this.isVisble = false
        
      }
      else if(this.userTypeId == 4 || this.userTypeId == 5){
        this.rowData = this.combinedArray.filter(item => item.aisheCode == this.aisheCode && item.lockStatus == true)
      }
      else if(this.userNpdTypeList){
          this.rowData = this.combinedArray.filter(item => item.lockStatus == true && item.isForwardedToNpd == true)
      }
      else{
        this.rowData = this.combinedArray
      }
    }
    else{
      this.rowData = []
      this.isVisble = false
    }
  });
}

onCategoryFilter(event:any){

}







}
