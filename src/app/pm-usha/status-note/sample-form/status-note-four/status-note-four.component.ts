import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-status-note-four',
  templateUrl: './status-note-four.component.html',
  styleUrls: ['./status-note-four.component.scss']
})
export class StatusNoteFourComponent implements OnInit {
  @Input() noteData: string; 
  dataList:any = [];
  paginatedDataFour:any = [];
  pageSize = 15;
  pageIndex = 0;
  rusaPhase: any = 'ALL'
  projectStatusListUpdate:any = [{ status: "Completed", id: 1 }, { status: "Ongoing", id: 2 },{ status: "Not yet started", id: 3 },]
  updateProjectStatus:any = 'ALL';
  filterArray:any =[]
  filterPhaseList: any = [{ name: "PM-USHA", keyname: "PM-USHA"}, { name: "RUSA 1", keyname: "RUSA 1" }, { name: "RUSA 2", keyname: "RUSA 2" }]
  showHeader: boolean = true;
  stateId:any = 'ALL'
  componentNameList:any = []
  variables:any = []

  

  constructor(private getService : GetService, public sharedService : SharedService) { }

  ngOnInit(): void {
    this.getStatusData()
    // this.getProjectStatusBottom()
  this.getComponentId('ALL')
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDataFour = this.dataList.slice(startIndex, endIndex);
  }

  ChangesRusaComponentSelection(e) {
   if (e === 'PM-USHA' || e === 'ALL') {
      this.showHeader = true;
    }
    else {
      this.showHeader = false;
    }
    this.updateProjectStatus = 'ALL'
    this.updateFunction(e)
    this.getComponentId(e)
    // this.getProjectStatusBottom()
  }

  updateFunction(e:any){
    if (e !== 'ALL') {
      this.dataList = this.filterArray.filter(o => o.rusaPhase === e)
    }
    else {
      this.dataList = this.filterArray
    }

    this.updatePaginatedData();
  }

  getProjectStatusBottom() {
    this.getService.getprojectStatusList().subscribe(res => {
        this.projectStatusListUpdate = res.data;
      }, err => {

    })
  }

  ChangesProjectStatus(statusValue: any) {
    if(statusValue == 'ALL'){
      this.dataList = this.filterArray
      this.updatePaginatedData()
     
    }
    else{
      this.dataList = this.filterArray.filter(evt => evt.rusaProjectStatusId ===  statusValue)
      this.updatePaginatedData()
    }
    this.rusaPhase = 'ALL'
   
  
  }


  

 


  getStatusData() {
   
    this.sharedService.noteData$.subscribe(res =>{
     
          this.dataList = res.data
          this.filterArray = [...this.dataList]
          this.updatePaginatedData()
          
     
  })
}

downloadPdf() {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'px' });
  
  // Get current date and time
  const today = new Date();
  const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const currentDateTime = date + ' ' + time;
  
  doc.setFont("times");

  let pdfData = [];
  let head: any = [];

  // Iterate through the dataList
  for (let i = 0; i < this.dataList.length; i++) {
  
    let rowData: any = {
      '0': i + 1,
      '1': this.dataList[i].componentName,
      '2': this.dataList[i].rusaPhase,
      '3': this.dataList[i].rusaProjectStatus,
      '4': this.dataList[i].institutionName,
      '5': this.dataList[i].districtName,
      '6': this.dataList[i].centralShareApproved,
      '7': this.dataList[i].physicalProgressTotal,
    };

    // Conditionally add the columns if the 'PM-USHA' project is detected
    if (this.dataList[i].rusaPhase === 'PM-USHA'|| this.dataList[i].rusaPhase === 'ALL') {
      rowData['8'] = this.dataList[i].completed;
      rowData['9'] = this.dataList[i].ongoing;
      rowData['10'] = this.dataList[i].notYetStarted;
    }else if ( this.dataList[i].rusaPhase === 'RUSA 1' ||  this.dataList[i].rusaPhase === 'RUSA 2') {
      rowData['8'] = { 
        content: this.dataList[i].activitiesYetToBeUnderTaken, 
        colSpan: 3, 
        styles: { halign: 'center' } 
      };
    }else{
      rowData['8']=this.dataList[i].activitiesYetToBeUnderTaken;
    }

    pdfData.push(rowData);
  }

  // Headings of the table
  head = [
    [{ title: 'Note Three Status',  colSpan: this.dataList.some(item => (item.rusaPhase === 'PM-USHA') || (item.rusaPhase === 'ALL')) ? 11: 9, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
    [
      { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
      { title: 'Component Name', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'Phase', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'Project Status', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'Institution Name', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [245, 198, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 238, 186], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      { title: 'Physical Progress (%)', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      {
        title: 'Activities Yet to be Undertaken',
        colSpan: this.dataList.some(item => (item.rusaPhase === 'PM-USHA') || (item.rusaPhase === 'ALL')) ? 3 : 1,
        rowSpan: 0,
        styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] }
      },
      
    ],
    []
  ];

  // Add conditional columns for PM-USHA
  if (this.dataList.some(item => (item.rusaPhase === 'PM-USHA') || ((item.rusaPhase ==='ALL') && ( item.rusaProjectStatus=== '1')||  ( item.rusaProjectStatus=== '2') ||  ( item.rusaProjectStatus=== '3') ))) {
    head[2].push(
      { title: "Completed", styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
      { title: "Ongoing", styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
      { title: "Not Yet Started", styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } }
    );
  }else {
      // Ensure this section does not apply default fillColor when condition fails.
      // Only apply default styles when PM-USHA or ALL are not present
      head[2].push(
        { title: "", styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        
      );
  }

  // Generate the PDF
  autoTable(doc, {
    head: head,
    body: pdfData,
    columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [190, 229, 235] }, 5: { halign: 'center', fillColor: [245, 198, 203] }, 6: { halign: 'center', fillColor: [255, 238, 186] }, 7: { halign: 'center', fillColor: [214, 216, 219] }, 8: { halign: 'center', fillColor: [190, 229, 235] }, 9: { halign: 'center', fillColor: [190, 229, 235] },10: { halign: 'center', fillColor: [190, 229, 235] }, },
    showFoot: "lastPage",
    startY: 5,
    tableLineColor: 200,
    showHead: 'everyPage',
    theme: 'grid',
    margin: { top: 5 },
    styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] },
  });

  // Footer
  doc.setFontSize(12);
  const totalPages = doc.internal.pages.length - 1;
  const currentPage = doc.internal.pages.length - 1;
  doc.text(`Page : ${currentPage} of ${totalPages}`, 30, 425);
  doc.text(`Generate Date & Time : ${currentDateTime}`, 90, 425);
  doc.save('Note Three Status.pdf');
}



componentIdList() {
  this.getService.getComponent().subscribe((res => {
   this.variables = res
    this.variables = this.variables.splice(0, 5)
   
  }))
}


getComponentId(getValue: any) {
  let phaseRUSA1 = getValue === 'RUSA 1' ? '1' : getValue === 'RUSA 2' ? '2' : '-1'
  this.getService.getComponentName(phaseRUSA1)?.subscribe(res => {
    if (getValue === 'PM-USHA') {
      this.componentIdList()
    }
    else {
      this.variables = res
      this.variables.forEach((e: any) => {
        e['componentName'] = e['name'];
      })
      this.variables = this.variables.slice()
     
    }
  })
}


RusaCompStatus(statusValues: any[]) {
  
 
  let value = statusValues.toString()
 if (this.paginatedDataFour != "" && statusValues.length > 0) {
  this.paginatedDataFour = this.dataList
    .filter(m => value.includes(m.componentId))
    .map(item => item);
    this.updatePaginatedData()
} else {
  // Reset to show all data when nothing is selected
  this.paginatedDataFour = this.dataList;
  this.updatePaginatedData()
}



}



}
