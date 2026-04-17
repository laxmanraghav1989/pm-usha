import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-population-data',
  templateUrl: './population-data.component.html',
  styleUrls: ['./population-data.component.scss']
})
export class PopulationDataComponent implements OnInit {
  formData: FormGroup
  source: any;
  year: any
  disabledPage: boolean = false
  stateCode: any;
  isFormInvalid: boolean = false
  numberdotRegex:RegExp=/^\d+(?:\.\d+)?$/
  userTypeId: string;
  constructor(public common: Common, public api: ApiService, public notification: NotificationService, public fb: FormBuilder,public sharedService:SharedService) {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userTypeId=sessionStorage.getItem('userTypeId')
    this.formData = this.fb.group({
      year: [null, [Validators.required]],
      source: [null, [Validators.required]]
    })
    // if(sessionStorage.getItem('stateP')){
    //   this.disabledPage = true
    //  }
  }

  ngOnInit(): void {
    this.getPopulationData();
    this.getPageStatusList()
  }
  getPageStatusList() {
    this.api.getPageStatus('').subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].page === this.common.population) {
            this.disabledPage = true
             this.sharedService.setMenu(true)
          }
          // if (res.data[index].moduleName === this.common.stateAtGlance) {
          //   this.disabledPage = true
          // }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  save(locked:boolean) {
    
    if (this.formData.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false
    }
    let year = this.formData.controls['year'].value;
    year.toString();
    if (year.toString().length !== 4) {
      this.notification.showValidationMessage('Please enter year in (YYYY) !!!');
      return;
    }
    for (let index = 0; index < this.common.statePopulations.length; index++) {
      if (this.common.statePopulations[index].scTotal === null || this.common.statePopulations[index].stTotal === null || this.common.statePopulations[index].obcTotal === null || this.common.statePopulations[index].otherTotal === null) {
        this.notification.mandatory();
        return;
      }
      if (this.common.statePopulations[index].stPercentageGtotal === null || this.common.statePopulations[index].scPercentageGtotal === null || this.common.statePopulations[index].obcPercentageGtotal === null || this.common.statePopulations[index].otherPercentageGtotal === null) {
        this.notification.mandatory();
        return;
      }
    }

    let temp = [];
    this.common.statePopulations.map((ele: any, i: number) => {
      temp.push({
        "gender": {
          "genderName": ele.genderName,
          "id": ele.genderId
        },
        "grandTotal": ele.grandTotal.toString(),
        "id": ele.id,
        "obcPercentageGtotal": ele.obcPercentageGtotal.toString(),
        "obcTotal": ele.obcTotal.toString(),
        "otherPercentageGtotal": ele.otherPercentageGtotal.toString(),
        "otherTotal": ele.otherTotal.toString(),
        "scPercentageGtotal": ele.scPercentageGtotal.toString(),
        "scTotal": ele.scTotal.toString(),
        "source": this.formData.controls['source'].value,
        "stPercentageGtotal": ele.stPercentageGtotal.toString(),
        "stTotal": ele.stTotal.toString(),
        "stateCode": this.stateCode,
        "year": this.formData.controls['year'].value
      })
    })
    temp.splice(3, 1);
    let payload = {
      stateCode:this.stateCode,
      locked:locked,
      statePopulations: temp,
      menu: this.common.Menu['1'].value
    }
    this.api.saveBasicdataPopulation(payload).subscribe(res => {
      if (res.status === 200) {
        // this.notification.showSuccess();
        this.getPopulationData()
        if(locked){
          this.getPageStatusList()
          this.notification.showSuccessMessage(this.sharedService.locked)
        }else{
          this.notification.showSuccess();
        }
       
        
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  getPopulationData() {
    this.api.getPopulation(this.stateCode).subscribe((res: any) => {
      if (res.data.statePopulations && res.data.statePopulations.length) {
        this.common.statePopulations = []
        this.common.statePopulations = res.data.statePopulations;
        this.common.statePopulations.push({
          genderName: 'Total',
          genderId: 0,
          grandTotal: 0,
          id: 0,
          obcPercentageGtotal: 0,
          obcTotal: 0,
          otherPercentageGtotal: 0,
          otherTotal: 0,
          scPercentageGtotal: 0,
          scTotal: 0,
          source: '',
          stPercentageGtotal: 0,
          stTotal: 0,
          stateCode: '',
          year: 0
        })
        this.common.statePopulations.forEach((ele: any, i: number) => {
          if (ele.genderName !== 'Total') {
            this.formData.get('year').setValue(ele.year)
            this.formData.get('source').setValue(ele.source)
          }

          if (ele?.gender?.id === 1) {
            ele['genderName'] = 'Male'
            ele['genderId'] = 1
          } if (ele?.gender?.id === 2) {
            ele['genderName'] = 'Female'
            ele['genderId'] = 2
          } if (ele?.gender?.id === 3) {
            ele['genderName'] = 'Transgender'
            ele['genderId'] = 3
          }
          ele.scPercentageGtotal = parseFloat(ele.scPercentageGtotal)
          ele.stPercentageGtotal = parseFloat(ele.stPercentageGtotal)
          ele.obcPercentageGtotal = parseFloat(ele.obcPercentageGtotal)
          ele.otherPercentageGtotal = parseFloat(ele.otherPercentageGtotal)

          ele.scTotal = parseFloat(ele.scTotal)
          ele.stTotal = parseFloat(ele.stTotal)
          ele.obcTotal = parseFloat(ele.obcTotal)
          ele.otherTotal = parseFloat(ele.otherTotal)

          let grandTotal = ele.scTotal + ele.stTotal + ele.obcTotal + ele.otherTotal;
          ele.grandTotal = parseFloat(grandTotal.toFixed(2))
        })
        this.calculateTotal()
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
 
  grandTotal(value: any, i: number) {
    let a = this.numberdotRegex.test(value);

    if(!a){
      return;
    }
    this.grand = this.common.statePopulations[i].scTotal + this.common.statePopulations[i].stTotal + this.common.statePopulations[i].obcTotal + this.common.statePopulations[i].otherTotal;
    this.common.statePopulations[i].grandTotal = parseFloat(this.grand.toFixed(2))
    this.calculateTotal();

  }
  //parseFloat("123.456").toFixed(2);
  scTotal:any
  stTotal:any
  obcTotal:any
  otherTotal:any;
  scPercentageGtotal:any;
  stPercentageGtotal:any;
  obcPercentageGtotal:any;
  otherPercentageGtotal:any;
  grand:any
  calculateTotal() {
    this.scTotal = this.common.statePopulations['0'].scTotal + this.common.statePopulations['1'].scTotal + this.common.statePopulations['2'].scTotal
    this.stTotal = this.common.statePopulations['0'].stTotal + this.common.statePopulations['1'].stTotal + this.common.statePopulations['2'].stTotal
    this.obcTotal = this.common.statePopulations['0'].obcTotal + this.common.statePopulations['1'].obcTotal + this.common.statePopulations['2'].obcTotal
    this.otherTotal = this.common.statePopulations['0'].otherTotal + this.common.statePopulations['1'].otherTotal + this.common.statePopulations['2'].otherTotal
    this.scPercentageGtotal = this.common.statePopulations['0'].scPercentageGtotal + this.common.statePopulations['1'].scPercentageGtotal + this.common.statePopulations['2'].scPercentageGtotal
    this.stPercentageGtotal = this.common.statePopulations['0'].stPercentageGtotal + this.common.statePopulations['1'].stPercentageGtotal + this.common.statePopulations['2'].stPercentageGtotal
    this.obcPercentageGtotal = this.common.statePopulations['0'].obcPercentageGtotal + this.common.statePopulations['1'].obcPercentageGtotal + this.common.statePopulations['2'].obcPercentageGtotal
    this.otherPercentageGtotal = this.common.statePopulations['0'].otherPercentageGtotal + this.common.statePopulations['1'].otherPercentageGtotal + this.common.statePopulations['2'].otherPercentageGtotal
    this.grand = this.common.statePopulations['0'].grandTotal + this.common.statePopulations['1'].grandTotal + this.common.statePopulations['2'].grandTotal
    this.common.statePopulations['3'].scTotal = parseFloat(this.scTotal.toFixed(2))
    this.common.statePopulations['3'].stTotal = parseFloat(this.stTotal.toFixed(2))
    this.common.statePopulations['3'].obcTotal = parseFloat(this.obcTotal.toFixed(2))
    this.common.statePopulations['3'].otherTotal = parseFloat(this.otherTotal.toFixed(2))
    this.common.statePopulations['3'].scPercentageGtotal = parseFloat(this.scPercentageGtotal.toFixed(2))
    this.common.statePopulations['3'].stPercentageGtotal = parseFloat(this.stPercentageGtotal.toFixed(2))
    this.common.statePopulations['3'].obcPercentageGtotal = parseFloat(this.obcPercentageGtotal.toFixed(2))
    this.common.statePopulations['3'].otherPercentageGtotal = parseFloat(this.otherPercentageGtotal.toFixed(2))
    this.common.statePopulations['3'].grandTotal = parseFloat(this.grand.toFixed(2))

  }
  reset() {
    this.formData.reset()
    this.common.statePopulations.forEach(ele => {
      ele.grandTotal = 0,
        // ele.id = 0,
        ele.obcPercentageGtotal = 0,
        ele.obcTotal = 0,
        ele.otherPercentageGtotal = 0,
        ele.otherTotal = 0,
        ele.scPercentageGtotal = 0,
        ele.scTotal = 0,
        this.source = '',
        ele.stPercentageGtotal = 0,
        ele.stTotal = 0,
        this.year = ''
    })
  }
}
