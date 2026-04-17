import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfs-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  DocumentList = [
    {id:0, name:"Guidelines", documentlink:"assets/docs/PM USHA Final Guidelines.pdf"},
    {id:1, name:"Revision in Guidelines", documentlink:"assets/docs/REVISIONS IN GUIDELINES OF PMUSHA (dated 20.10.2023).pdf"},
    {id:2, name:"PAB-1 Minutes", documentlink:"assets/docs/PAB-1 Minutes.pdf"},
    {id:3, name:"PAB-2 Minutes", documentlink:"assets/docs/PAB-2 Minutes.pdf"},
    {id:4, name:"PAB-3 Minutes", documentlink:"assets/docs/PAB-3 Minutes.pdf"},
    {id:5, name:"PAB-3 Minutes Corrigendum", documentlink:"assets/docs/PAB-3 Minutes Corrigendum.pdf"},

  ]

  DocumentList1 = [
    {id:6, name:"PAB-4 Minutes Meeting", documentlink:"assets/docs/Minutes of 4th PAB Meeting.pdf"},
    {id:7, name:"Bihar - district-wise projects approved since inception", documentlink:"assets/docs/Bihar - district-wise projects approved.pdf"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
