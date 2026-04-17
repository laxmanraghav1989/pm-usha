import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SharedService } from 'src/app/shared/shared.service';

import 'jspdf-autotable';


@Component({
  selector: 'cfs-status-note-five',
  templateUrl: './status-note-five.component.html',
  styleUrls: ['./status-note-five.component.scss']
})
export class StatusNoteFiveComponent implements OnInit {
@Input() noteData: string; 
  dataList:any = [];
  legacyDataArr:any = []
  componentCounts: {
    componentId: number;
    componentName: string;
    count: number;
    ranges: { [key: string]: number };
    totalAmountApproved: number;
  }[] = [];
  
  downloadArr1:any[] = [];
  downloadArr2:any[] = [];
  downloadArr3:any[] = [];
  downloadArr4:any[] = [];
  isPanelOpenRusa1:boolean;
  isPanelOpenRusa2:boolean;
  isPanelOpenPmUsha:boolean;
  numberUnitsTotal:any = 0;
  progressStatusTotal100:any = 0;
  progressStatusTotal99:any = 0;
  progressStatusTotal75:any = 0;
  progressStatusTotal50:any = 0;
  stateShareTotal:any = 0;
    constructor(public sharedService : SharedService) { }

  ngOnInit(): void {
    this.getStatusData()
  }


  tabValue(e, prposalId){
     if(prposalId ===1){
    const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
      const ranges = {
        "100": (value: number) => value === 100,
        "95-97": (value: number) => value >= 95 && value <= 97,
        "74-50": (value: number) => value >= 50 && value <= 74,
        "below 50": (value: number) => value < 50
      };

      this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'RUSA 1')


     

  


      this.dataList.forEach(item => {
        const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
        if (!counts[key]) {
          counts[key] = {
            componentId: item.componentId,
            componentName: item.componentName,
            count: 0,
            ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
            totalAmountApproved : 0
          };
        }
        counts[key].count += 1;
        counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
  
        // Update the ranges for physicalProgressTotal
        Object.keys(ranges).forEach(range => {
          if (ranges[range](item.physicalProgressTotal)) {
            counts[key].ranges[range]++;
          }
        });
      });

    


      this.componentCounts = Object.entries(counts).map(([key, value]) => ({
        componentId: value.componentId,
        componentName: value.componentName,
        count: value.count,
        ranges: value.ranges,
        totalAmountApproved: value.totalAmountApproved

      }));

    this.numberUnitsTotal = this.componentCounts.reduce((sum, item) => sum + item.count, 0);
    this.progressStatusTotal100 = this.componentCounts.reduce((sum, item) => sum + item.ranges["100"], 0);
    this.progressStatusTotal99 = this.componentCounts.reduce((sum, item) => sum + item.ranges["95-97"], 0);
    this.progressStatusTotal75 = this.componentCounts.reduce((sum, item) => sum + item.ranges["74-50"], 0);
    this.progressStatusTotal50 = this.componentCounts.reduce((sum, item) => sum + item.ranges["below 50"], 0);
    this.stateShareTotal = this.componentCounts.reduce((sum, item) => sum + sum + item.totalAmountApproved, 0);
 
     

      this.downloadArr1=[...this.componentCounts]
      return this.downloadArr1


 

    }
    else if(prposalId === 2){
      const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
      const ranges = {
        "100": (value: number) => value === 100,
        "95-97": (value: number) => value >= 95 && value <= 97,
        "74-50": (value: number) => value >= 50 && value <= 74,
        "below 50": (value: number) => value < 50
      };
      this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'RUSA 2')
      this.dataList.forEach(item => {
        const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
        if (!counts[key]) {
          counts[key] = {
            componentId: item.componentId,
            componentName: item.componentName,
            count: 0,
            ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
            totalAmountApproved : 0
          };
        }
        counts[key].count += 1;
        counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
  
        // Update the ranges for physicalProgressTotal
        Object.keys(ranges).forEach(range => {
          if (ranges[range](item.physicalProgressTotal)) {
            counts[key].ranges[range]++;
          }
        });
      });
      this.componentCounts = Object.entries(counts).map(([key, value]) => ({
        componentId: value.componentId,
        componentName: value.componentName,
        count: value.count,
        ranges: value.ranges,
        totalAmountApproved: value.totalAmountApproved

      }));
      this.numberUnitsTotal = this.componentCounts.reduce((sum, item) => sum + item.count, 0);
      this.progressStatusTotal100 = this.componentCounts.reduce((sum, item) => sum + item.ranges["100"], 0);
      this.progressStatusTotal99 = this.componentCounts.reduce((sum, item) => sum + item.ranges["95-97"], 0);
      this.progressStatusTotal75 = this.componentCounts.reduce((sum, item) => sum + item.ranges["74-50"], 0);
      this.progressStatusTotal50 = this.componentCounts.reduce((sum, item) => sum + item.ranges["below 50"], 0);
      this.stateShareTotal = this.componentCounts.reduce((sum, item) => sum + sum + item.totalAmountApproved, 0);
      this.downloadArr2=[...this.componentCounts];
      return this.downloadArr2
    }
    else if(prposalId ===3){
      const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
      const ranges = {
        "100": (value: number) => value === 100,
        "95-97": (value: number) => value >= 95 && value <= 97,
        "74-50": (value: number) => value >= 50 && value <= 74,
        "below 50": (value: number) => value < 50
      };
      this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'PM-USHA')
      this.dataList.forEach(item => {
        const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
        if (!counts[key]) {
          counts[key] = {
            componentId: item.componentId,
            componentName: item.componentName,
            count: 0,
            ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
            totalAmountApproved : 0
          };
        }
        counts[key].count += 1;
        counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
  
        // Update the ranges for physicalProgressTotal
        Object.keys(ranges).forEach(range => {
          if (ranges[range](item.physicalProgressTotal)) {
            counts[key].ranges[range]++;
          }
        });
      });
      this.componentCounts = Object.entries(counts).map(([key, value]) => ({
        componentId: value.componentId,
        componentName: value.componentName,
        count: value.count,
        ranges: value.ranges,
        totalAmountApproved: value.totalAmountApproved

      }));
      this.numberUnitsTotal = this.componentCounts.reduce((sum, item) => sum + item.count, 0);
      this.progressStatusTotal100 = this.componentCounts.reduce((sum, item) => sum + item.ranges["100"], 0);
      this.progressStatusTotal99 = this.componentCounts.reduce((sum, item) => sum + item.ranges["95-97"], 0);
      this.progressStatusTotal75 = this.componentCounts.reduce((sum, item) => sum + item.ranges["74-50"], 0);
      this.progressStatusTotal50 = this.componentCounts.reduce((sum, item) => sum + item.ranges["below 50"], 0);
      this.stateShareTotal = this.componentCounts.reduce((sum, item) => sum + sum + item.totalAmountApproved, 0);
      this.downloadArr3=[...this.componentCounts]
      return this.downloadArr3
    }
    this.downloadArr4=[...this.downloadArr1,...this.downloadArr2,...this.downloadArr3]

   


  }

  onChange(event: any) {
    this.sharedService.pageSizeCustom = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSizeCustom)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom)
    var a = Math.ceil(this.dataList.length / Number(this.sharedService.pageSizeCustom));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.dataList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.dataList.length - 1);
    }

  }

  
  getStatusData() {
    this.sharedService.noteData$.subscribe(res =>{
        if (res.status == 200) {
          this.legacyDataArr = res.data
        this.handlePageChange(this.sharedService.page = 1)
      }
      else {
        this.legacyDataArr = []
      }
    },
      err => {
        this.legacyDataArr = []
      })
  
}
fu() {
  let count = 0;

  // Nested function to modify count
  function fh1() {
    count += 1;
    return count;
  }

  return fh1;
}

downloadPdf1() {
  let head = [];
  let download1 = [];

  const incrementCount = this.fu();  // fu() returns a function to increment the count
  const sdd = incrementCount(); // RUSA 1.0
  const yu = incrementCount(); // RUSA 2.0
  const po = incrementCount(); // RUSA 3.0

  const doc:any = new jsPDF();

  // Helper function to create headers for each RUSA phase
  const createHeader = (phase) => {
    return [
      [{ title: `${phase}`, colSpan: 8, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
      [
        { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
        { title: 'Component', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Number of Units', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Physical Progress Status (In %)', colSpan: 4, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Total Amount approved including State share', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      ],
      [
        { title: "100", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "99-75", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "74-50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "Below 50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
      ]
    ];
  }

  

  // Function to validate and log the data structure
  const validateData = (data) => {

    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      return true;
    } else {
      console.error('Invalid data structure for autoTable.');
      return false;
    }
  };

  // Track the Y position for where the next table should start
  let startY = 10;  // Initial Y position for the first table

  // Handle RUSA 1.0
  if (sdd === 1) {
    let head1111 = [

        [{ title: `Note One Status`, colSpan: 8, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
        [
          { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
          { title: 'Component', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
          { title: 'Number of Units', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
          { title: 'Physical Progress Status (In %)', colSpan: 4, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
          { title: 'Total Amount approved including State share', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        ],
        [
          { title: "100", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
          { title: "99-75", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
          { title: "74-50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
          { title: "Below 50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        ],
    
    ];
    const sdf12 = this.tabValue('', sdd);
   // if (!validateData(sdf12)) return;

    download1 = [...sdf12];
let pdfData=[]
    download1.forEach((component, index) => {
      pdfData.push({
        '0': index + 1,
        '1': component.componentName,
        '2': component.count,
        '3': component.ranges['100'],
        '4': component.ranges['95-97'],
        '5': component.ranges['74-50'],
        '6': component.ranges['below 50'],
        '7': Number.isNaN(component.totalAmountApproved) ? 0 : component.totalAmountApproved,
      });
    });
    head = createHeader('RUSA 1.0');
    doc.autoTable({ head: head1111,
      columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [195, 230, 203] }, 5: { halign: 'center', fillColor: [195, 230, 203] }, 6: { halign: 'center', fillColor: [195, 230, 203] }, 7: { halign: 'center', fillColor: [190, 229, 235] }, },
       body: pdfData, startY: startY, tableLineColor: 200,
       showHead: 'everyPage',
       theme: 'grid',
       margin: { top: 5 },
       styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
    startY = doc.lastAutoTable.finalY + 10; // Adjust Y for next table
    doc.addPage(); // Add a page break for the next section
  }

  // Handle RUSA 2.0
  if (yu === 2) {

    let head112 = [
      [{ title: 'Note two Status', colSpan: 8, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
    
      [
        { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
        { title: 'Component', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Number of Units', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Physical Progress Status (In %)', colSpan: 4, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Total Amount approved including State share', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      ],
      [
        { title: "100", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "99-75", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "74-50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "Below 50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
      ],
    
    ];
    const sdf1 = this.tabValue('', yu);
    //if (!validateData(sdf1)) return;

    let download11 = [...sdf1];
    let pdfData2=[];
    download11.forEach((component, index) => {
      pdfData2.push({
        '0': index + 1,
        '1': component.componentName,
        '2': component.count,
        '3': component.ranges['100'],
        '4': component.ranges['95-97'],
        '5': component.ranges['74-50'],
        '6': component.ranges['below 50'],
        '7':  Number.isNaN(component.totalAmountApproved) ? 0 : component.totalAmountApproved,
      });
    });
    head = createHeader('RUSA 2.0');
    doc.autoTable({ head: head112,
      columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [195, 230, 203] }, 5: { halign: 'center', fillColor: [195, 230, 203] }, 6: { halign: 'center', fillColor: [195, 230, 203] }, 7: { halign: 'center', fillColor: [190, 229, 235] }, },
       body: pdfData2, startY: startY, tableLineColor: 200,
       showHead: 'everyPage',
       theme: 'grid',
       margin: { top: 5 },
       styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
    startY = doc.lastAutoTable.finalY + 10;
    doc.addPage();
  }

  // Handle RUSA 3.0
  if (po === 3) {

    let head1 = [
      [{ title: 'Note Three Status', colSpan: 8, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
    
      [
        { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
        { title: 'Component', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Number of Units', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Physical Progress Status (In %)', colSpan: 4, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        { title: 'Total Amount approved including State share', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
      ],
      [
        { title: "100", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "99-75", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "74-50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
        { title: "Below 50", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
      ],
    ];

    const sdf122 = this.tabValue('', po);
   // if (!validateData(sdf122)) return;
   let pdfData12=[];
   sdf122.forEach((component, index) => {
    pdfData12.push({
      '0': index + 1,
      '1': component.componentName,
      '2': component.count,
      '3': component.ranges['100'],
      '4': component.ranges['95-97'],
      '5': component.ranges['74-50'],
      '6': component.ranges['below 50'],
      '7':  Number.isNaN(component.totalAmountApproved) ? 0 : component.totalAmountApproved,
    });
  });
    download1 = [...sdf122];
    head = createHeader('RUSA 3.0');
    doc.autoTable({ head: head1,
      columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [195, 230, 203] }, 5: { halign: 'center', fillColor: [195, 230, 203] }, 6: { halign: 'center', fillColor: [195, 230, 203] }, 7: { halign: 'center', fillColor: [190, 229, 235] }, },
       body: pdfData12, startY: startY, tableLineColor: 200,
       showHead: 'everyPage',
       theme: 'grid',
       margin: { top: 5 },
       styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
  }

  // Save the generated PDF
  doc.save("Component-wise details");


  this.isPanelOpenRusa1=false;
  this.isPanelOpenRusa2=false;
  this.isPanelOpenPmUsha=false;
}




}




