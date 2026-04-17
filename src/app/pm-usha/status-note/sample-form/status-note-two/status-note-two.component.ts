import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'cfs-status-note-two',
  templateUrl: './status-note-two.component.html',
  styleUrls: ['./status-note-two.component.scss']
})
export class StatusNoteTwoComponent implements OnInit {
@Input() noteData: string; 
@Input() stateValue!: string;
  legacyDataArr:any = []
meruDataArry:any = []
gscuDataArry:any = []
gieiDataArry:any = []
gscDataArry:any = []
dataList:any  = []
paginatedData = [];
pageSize = 10;
pageIndex = 0;
isPanelOpenMeru:boolean;
isPanelOpenGsu: boolean;
isPanelOpenGsc: boolean;
isPanelOpenGiei: boolean;



  constructor(public sharedService : SharedService,private dialog : MatDialog) { }

  ngOnInit(): void {
  
    this.getRusaLegacyData()
    
   
  }


  
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.dataList.slice(startIndex, endIndex);
  }






  tabValue(e, prposalId){
    this.dataList = this.legacyDataArr.filter(
      item => item.rusaPhase === 'PM-USHA' && item.componentId === prposalId
    );
    this.pageIndex = 0;
    this.updatePaginatedData();
    return this.dataList

  }

  getRusaLegacyData() {
    this.sharedService.noteData$.subscribe(res =>{
      this.legacyDataArr = res.data
      this.updatePaginatedData();
    
   });
  }
  fu() {
    let count = 0; // 'count' is a variable in the outer function's scope
    return function() {
      count += (count < 3) ? 1 : 2; // Increment by 1 if count is less than 3, otherwise by 2
      return count;
    };
  }

  downloadAccordionData() {
    // const dialogRef = this.dialog.open(NoteStatusNoteDialogComponent, {
    //           width: '100%',
    //           data: this.legacyDataArr
    // })

    let head = [];
    let download1 = [];
  
    const incrementCount = this.fu();  // fu() returns a function to increment the count
    const meru = incrementCount(); //1
    const gsu = incrementCount(); //2
    const gsc = incrementCount();  //3
    const giei = incrementCount(); //5
   

    const doc:any = new jsPDF();
    
      // Helper function to create headers for each RUSA phase
      const createHeader = (phase) => {
        return [
          [{ title: `${phase}`, colSpan: 10, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
          [
            { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
            { title: 'Name of the Institution/ District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Aishe Code', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Released	', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Utilised', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Activities Undertaken', colSpan: 3, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },

          ],
          [
            { title: "Completed", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Ongoing	", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Not Yet Started", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
           
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
      if (meru === 1) {
        let head1111 = [
    
            [{ title: `Meru`, colSpan: 10, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
            [
              { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
              { title: 'Name of the Institution/ District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'Aishe Code', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'Total Amount Released	', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'Total Amount Utilised', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
              { title: 'Activities Undertaken', colSpan: 3, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
  
            ],
            [
              { title: "Completed", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
              { title: "Ongoing	", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
              { title: "Not Yet Started", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
             
            ]
        
        ];
        const meruData = this.tabValue('', meru);
        // if (!validateData(sdf12)) return;
        
        download1 = [...meruData];
        
    let pdfData=[]
        download1.forEach((component, index) => {
          pdfData.push({
            '0': index + 1,
            '1': component.institutionName,
            '2': component.aisheCode,
            '3': component.districtName,
            '4': component.totalAmountApproved,
            '5': component.totalAmountReleased,
            '6': component.totalUtilisation,
            '7':  component.completed,
            '8': component.ongoing,
            '9': component.notYetStarted,
          });
        });
        head = createHeader('MERU');
        doc.autoTable({ head: head1111,
          columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [190, 229, 235] }, 5: { halign: 'center', fillColor: [153, 204, 255] }, 6: { halign: 'center', fillColor: [214, 216, 219] }, 7: { halign: 'center', fillColor: [195, 230, 203] },8: { halign: 'center', fillColor: [195, 230, 203] },9: { halign: 'center', fillColor: [195, 230, 203] }, },
           body: pdfData, startY: startY, tableLineColor: 200,
           showHead: 'everyPage',
           theme: 'grid',
           margin: { top: 5 },
           styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
        startY = doc.lastAutoTable.finalY + 10; // Adjust Y for next table
        doc.addPage(); // Add a page break for the next section
      }
    
      // Handle RUSA 2.0
      if (gsu === 2) {
    
        let head112 = [
          [{ title: 'GSU', colSpan:10, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
        
          [
            { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
            { title: 'Name of the Institution/ District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Aishe Code', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Released	', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Utilised', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Activities Undertaken', colSpan: 3, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },

          ],
          [
            { title: "Completed", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Ongoing	", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Not Yet Started", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
           
          ]
        
        ];
        const gsuData = this.tabValue('', gsu);

        //if (!validateData(sdf1)) return;
    
        let download11 = [...gsuData];
        let pdfData2=[];
        download11.forEach((component, index) => {
          pdfData2.push({
            '0': index + 1,
            '1': component.institutionName,
            '2': component.aisheCode,
            '3': component.districtName,
            '4': component.totalAmountApproved,
            '5': component.totalAmountReleased,
            '6': component.totalUtilisation,
            '7':  component.completed,
            '8': component.ongoing,
            '9': component.notYetStarted,
          });
        });
        head = createHeader('GSU');
        doc.autoTable({ head: head112,
          columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [190, 229, 235] }, 5: { halign: 'center', fillColor: [153, 204, 255] }, 6: { halign: 'center', fillColor: [214, 216, 219] }, 7: { halign: 'center', fillColor: [195, 230, 203] },8: { halign: 'center', fillColor: [195, 230, 203] },9: { halign: 'center', fillColor: [195, 230, 203] }, },
           body: pdfData2, startY: startY, tableLineColor: 200,
           showHead: 'everyPage',
           theme: 'grid',
           margin: { top: 5 },
           styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
        startY = doc.lastAutoTable.finalY + 10;
        doc.addPage();
      }
    
      // Handle RUSA 3.0
      if (gsc === 3) {
    
        let head1 = [
          [{ title: 'GSC', colSpan: 10, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
        
          [
            { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
            { title: 'Name of the Institution/ District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Aishe Code', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Released	', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Utilised', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Activities Undertaken', colSpan: 3, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },

          ],
          [
            { title: "Completed", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Ongoing	", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Not Yet Started", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
           
          ]
        ];
    
        const gscData = this.tabValue('', gsc);
       // if (!validateData(sdf122)) return;
       let download12 = [...gscData];
       let pdfData12=[];
       download12.forEach((component, index) => {
        pdfData12.push({
          '0': index + 1,
          '1': component.institutionName,
            '2': component.aisheCode,
            '3': component.districtName,
            '4': component.totalAmountApproved,
            '5': component.totalAmountReleased,
            '6': component.totalUtilisation,
            '7':  component.completed,
            '8': component.ongoing,
            '9': component.notYetStarted,
        });
      });
        download12 = [...gscData];
        head = createHeader('GSC');
        doc.autoTable({ head: head1,
          columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [190, 229, 235] }, 5: { halign: 'center', fillColor: [153, 204, 255] }, 6: { halign: 'center', fillColor: [214, 216, 219] }, 7: { halign: 'center', fillColor: [195, 230, 203] },8: { halign: 'center', fillColor: [195, 230, 203] },9: { halign: 'center', fillColor: [195, 230, 203] }, },
           body: pdfData12, startY: startY, tableLineColor: 200,
           showHead: 'everyPage',
           theme: 'grid',
           margin: { top: 5 },
           styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
      }

      if (giei === 5) {
    
        let head1 = [
          [{ title: 'GIEI', colSpan:10, rowSpan: 0, styles: { halign: 'center', fillColor: [243, 243, 243], textColor: [0, 0, 0], lineWidth: 1, lineColor: [0, 0, 0] } }],
        
          [
            { title: "S.No.", colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, cellWidth: 'wrap', lineColor: [0, 0, 0] } },
            { title: 'Name of the Institution/ District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', cellWidth: 'wrap', padding: 10, fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Aishe Code', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'District', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Approved', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [190, 229, 235], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Released	', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Total Amount Utilised', colSpan: 1, rowSpan: 2, styles: { halign: 'center', fillColor: [214, 216, 219], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
            { title: 'Activities Undertaken', colSpan: 3, rowSpan: 0, styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },

          ],
          [
            { title: "Completed", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Ongoing	", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
            { title: "Not Yet Started", styles: { halign: 'center', fillColor: [195, 230, 203], textColor: [0, 0, 0], lineWidth: 0.2, minCellWidth: 10, lineColor: [0, 0, 0] } },
           
          ]
        ];
    
        const gieiData = this.tabValue('', giei);
       // if (!validateData(sdf122)) return;
       download1 = [...gieiData];
       let pdfData12=[];
       download1.forEach((component, index) => {
        pdfData12.push({
          '0': index + 1,
         '1': component.institutionName=='NULL'?'':component.institutionName,
            '2': component.aisheCode,
            '3': component.districtName,
            '4': component.totalAmountApproved,
            '5': component.totalAmountReleased,
            '6': component.totalUtilisation,
            '7':  component.completed,
            '8': component.ongoing,
            '9': component.notYetStarted,
        });
      });
        download1 = [...gieiData];
        head = createHeader('GIEI');
        doc.autoTable({ head: head1,
          columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center', fillColor: [153, 204, 255] }, 2: { halign: 'center', fillColor: [214, 216, 219] }, 3: { halign: 'center', fillColor: [195, 230, 203] }, 4: { halign: 'center', fillColor: [190, 229, 235] }, 5: { halign: 'center', fillColor: [153, 204, 255] }, 6: { halign: 'center', fillColor: [214, 216, 219] }, 7: { halign: 'center', fillColor: [195, 230, 203] },8: { halign: 'center', fillColor: [195, 230, 203] },9: { halign: 'center', fillColor: [195, 230, 203] }, },
           body: pdfData12, startY: startY, tableLineColor: 200,
           showHead: 'everyPage',
           theme: 'grid',
           margin: { top: 5 },
           styles: { font: 'times', halign: 'center', lineColor: [0, 0, 0] }, });
      }
    
      // Save the generated PDF
      doc.save("Summary of PM-USHA projects");

      this.isPanelOpenMeru=false;
    this.isPanelOpenGsu=false;
    this.isPanelOpenGsc=false;
    this.isPanelOpenGiei=false;

  }
}
