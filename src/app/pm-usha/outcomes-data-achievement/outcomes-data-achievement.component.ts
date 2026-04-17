import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-outcomes-data-achievement',
  templateUrl: './outcomes-data-achievement.component.html',
  styleUrls: ['./outcomes-data-achievement.component.scss']
})
export class OutcomesDataAchievementComponent implements OnInit {
arrYears:any = [
  {id: 2024,year : "2024-25" },
  {id: 2025,year : "2025-26" },
  {id: 2026,year : "2026-27" }
             ]
baseQuarterList :any = [
  { id: 1, quater: 'Q1 (1 Apr - 30 Jun)' },
  { id: 2, quater: 'Q2 (1 Jul - 30 Sep)' },
  { id: 3, quater: 'Q3 (1 Oct - 31 Dec)' },
  { id: 4, quater: 'Q4 (1 Jan - 31 Mar)' }]
quaterList:any[] = []
accreditedStatus: 'yes' | 'no' | null = null;
erpStatus : 'yes' | 'no' | null = null;
participationStatus : 'yes' | 'no' | null = null;
improveGrade = false;
renewAccreditation = false;
selectYear:any;
quater:any;
targetForm: FormGroup;
achivementForm:FormGroup;
quaterlySaveButtonName:string = 'Save'
moocSaveButtonName:string = 'Save'
isVisible:boolean = false
disabled:boolean = true
today: string;
lockStatus:any = false;
viewSection:boolean = false
lockButtonIsVisible:boolean= false
pabApproved: string;
pabConditionallyApproved: string;
trueValues: string[];
trueValuesConditionally: string[];
isTargetOpen:any = false;
moocCategories = [
  {
    id: 0,
    category: 'STEM',
    distinctMoocOffer: null,
    totalEnrolment: null,
    femaleEnrolment: null,
    scStObcTransEnrolment: null,
    totalCompletion: null,
    femaleCompletion: null,
    scStObcTransCompletion: null
  },
  {
    id: 0,
    category: 'Health & Paramedical',
    distinctMoocOffer: null,
    totalEnrolment: null,
    femaleEnrolment: null,
    scStObcTransEnrolment: null,
    totalCompletion: null,
    femaleCompletion: null,
    scStObcTransCompletion: null
  },
  {
    id: 0,
    category: 'Humanities, Social Sciences & Education',
     distinctMoocOffer: null,
    totalEnrolment: null,
    femaleEnrolment: null,
    scStObcTransEnrolment: null,
    totalCompletion: null,
    femaleCompletion: null,
    scStObcTransCompletion: null
  },
  {
    id: 0,
    category: 'Other Disciplines',
    distinctMoocOffer: null,
    totalEnrolment: null,
    femaleEnrolment: null,
    scStObcTransEnrolment: null,
    totalCompletion: null,
    femaleCompletion: null,
    scStObcTransCompletion: null
  }
];
moocCategoryMaster = [
  { id: 1, name: 'STEM' },
  { id: 2, name: 'Health & Paramedical' },
  { id: 3, name: 'Humanities, Social Sciences & Education' },
  { id: 4, name: 'Other Disciplines' }
];
  aisheCode: string;
  componentId: string;
  stateCode: string;
  districtCode: string;

  constructor(private getService : GetService, private fb : FormBuilder, private postService : PostService, private notification : NotificationService, private sharedService : SharedService, private route: ActivatedRoute, public router: Router) {
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.stateCode = sessionStorage.getItem("stateCode")
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
    this.componentId = this.trueValues[0]|| this.trueValuesConditionally[0]
    this.targetForm = this.fb.group({
            id: [0],
            aisheCode: [''],
            componentId : [''],
            stateId: [''],
            districtId: [''],
            financialYear: [''],
            financialQuarter : [''],

            isYourHeiCurrentlyAccredited: [null],
            accreditationDate: [''],
            accreditationCycle: ['', Validators.max(99999)],
            accreditationScore : ['', Validators.max(99999)],
            accreditationValidityDate: [''],
            accreditationGrade: ['', Validators.max(99999)],
            isSamarthErpAdopted: [''],
            isOtherErp : [''],
            dateOfSamarthAdoption: [''],
            dateOfOtherErpAdoption: [''],
            remarkErp: [''],
            isRegisteredAbc : [''],
            isOfferingMee: [''],
            researchPaperPublish: ['', Validators.max(99999)],
            researchPatentGrant: ['', Validators.max(99999)],
            eaiWorkshop : [''],
            eaiTotalParticipant: ['', Validators.max(99999)],
            eaiFemale: ['', Validators.max(99999)],
            eaiScStObcTrans: ['', Validators.max(99999)],
            eaiPwd : ['', Validators.max(99999)],
            eaiExpectedCompletion: ['', Validators.max(99999)],
            eaiIsDisabilityInclusiveInfraSession: [''],
            accreditationDateString: [''],
            accreditationValidityDateString: [''],
            dateOfSamarthAdoptionString: [''],
            dateOfOtherErpAdoptionString: ['']
           
    })
     this.achivementForm = this.fb.group({
            id: [0],
            aisheCode: [''],
            componentId : [''],
            stateId: [''],
            districtId: [''],
            financialYear: [''],
            financialQuarter : [''],
            moocId: [''],
            distinctMoocOffer: [''],
            totalEnrolment: [''],
            femaleEnrolment : [''],
            scStObcTransEnrolment: [''],
            totalCompletion: [''],
            femaleCompletion: [''],
            scStObcTransCompletion: [''],
            isTargetAchievement: [''],
            moocTargets: this.fb.array([])
     })
     this.loadMoocCategories();
     this.today = new Date().toISOString().split('T')[0];

this.route.queryParams.subscribe(params => {
  if (params['data'] === 'viewSection') {
    this.isTargetOpen = true
     this.viewSection = true
      this.sharedService.getTargetAchivementData
        .pipe(take(1))
        .subscribe(res => {

          if (res && res !== 0) {
            this.viewGetAchievementData(res);
            this.viewGetMoocTargetAchivement(res)

          } else {
            const storedData = sessionStorage.getItem('targetAchievementData');
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              this.viewGetAchievementData(parsedData);
              this.viewGetMoocTargetAchivement(parsedData)

            } 
          }
        });

    }
})

}

Back(){
 this.router.navigate(
        ['/app/outComesReport']);
}



viewGetAchievementData(data:any){
  let payload:any = {
    aisheCode : data.details.aisheCode,
    componentId : data.details.componentId,
    financialYear : data.financialYear,
    financialQuarter : data.financialQuarter,
    stateCode: data.details.stateCode,
    districtCode: data.details.districtCode,

}
this.getService.getQuarterlyAchievement(payload).subscribe(res =>{
  if(res.length > 0){
    this.isVisible = true
    this.targetForm.patchValue(res[0])
    this.targetForm.controls['accreditationDate'].setValue(this.sharedService.convertToInputDate(res[0].accreditationDateString))
    this.targetForm.controls['accreditationValidityDate'].setValue(this.sharedService.convertToInputDate(res[0].accreditationValidityDateString))
    this.targetForm.controls['dateOfSamarthAdoption'].setValue(this.sharedService.convertToInputDate(res[0].dateOfSamarthAdoptionString))
    this.lockStatus = res[0].lockStatus
    this.lockButtonIsVisible = true
    this.quaterlySaveButtonName = 'Update'
    this.formDisabledAndEnable()
  }
  else{
    const field1Value = this.targetForm.get('financialYear')?.value;
    const field2Value = this.targetForm.get('financialQuarter')?.value;
    this.targetForm.reset()
    this.targetForm.controls['financialYear'].setValue(field1Value);
    this.targetForm.controls['financialQuarter'].setValue(field2Value);
    this.quaterlySaveButtonName = 'Save'
    // this.lockButtonIsVisible = false
    this.lockStatus = false
    this.targetForm.enable()
  }

})

}


viewGetMoocTargetAchivement(data:any){
  let payload:any = {
 aisheCode : data.details.aisheCode,
    componentId : data.details.componentId,
    financialYear : data.financialYear,
    financialQuarter : data.financialQuarter,
    stateCode: data.details.stateCode,
    districtCode: data.details.districtCode,
    isTargetAchievement : 'A'
  }
  this.getService.getMOOCTargetAchivement(payload).subscribe(res => {
    if(res.length > 0){
    this.patchMoocTargets(res);
    this.moocSaveButtonName = 'Update'
    this.formDisabledAndEnable()
  }
  else{
    this.achivementForm.reset()
    this.loadMoocCategories()
    const field1Value = this.targetForm.get('financialYear')?.value;
    const field2Value = this.targetForm.get('financialQuarter')?.value;
    this.targetForm.controls['financialYear'].setValue(field1Value);
    this.targetForm.controls['financialQuarter'].setValue(field2Value);
     this.moocSaveButtonName = 'Save'
     
  }

  })
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


  
get moocTargets(): FormArray {
  return this.achivementForm.get('moocTargets') as FormArray;
}


loadMoocCategories() {
   const fa = this.moocTargets;
  fa.clear();
   if (!this.moocTargets) {
    // console.error('FormArray not initialized');
    return;
  }
  this.moocCategories.forEach(item => {
    this.moocTargets.push(
      this.fb.group({
        id: [item?.id || 0],
        category: [item.category],
        distinctMoocOffer: [item.distinctMoocOffer],
        totalEnrolment: [item.totalEnrolment],
        femaleEnrolment: [item.femaleEnrolment],
        scStObcTransEnrolment: [item.scStObcTransEnrolment],
        totalCompletion: [item.totalCompletion],
        femaleCompletion: [item.femaleCompletion],
        scStObcTransCompletion: [item.scStObcTransCompletion]
      })
    );
  });


}



  
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

selectedQuarter(data:any){
  this.disabled = false

}

Find(){
 
  this.getTargetAchievmentFilledOrNot()


}


getTargetAchievmentFilledOrNot(){
  let payload:any = {
  aisheCode : this.aisheCode,
  componentId : this.componentId,
  financialYear : this.targetForm.get("financialYear")?.value,
  financialQuarter : this.targetForm.get("financialQuarter")?.value,
  stateCode: this.stateCode,
  districtCode: this.districtCode,
  isTargetAchievement: "T",
  moocId : ''

}
this.getService.getTargetAchievmentFilledOrNot(payload).subscribe(res =>{
if(res["mooc-target-filled"] == true){
    this.isVisible = true  
    this.lockButtonIsVisible = true
    this.getAchievementData()
    this.getMoocTargetAchivement()
    
}
else{
  this.notification.showErrorMessage("Please fill-in the data in the 'Target Module' first.")
  this.isVisible = false
  this.lockStatus = false
  
}

})
}




getAchievementData(){
  let payload:any = {
  aisheCode : this.aisheCode,
  componentId : this.componentId,
  financialYear : this.targetForm.get("financialYear")?.value,
  financialQuarter : this.targetForm.get("financialQuarter")?.value,
  stateCode: this.stateCode,
  districtCode: this.districtCode,

}
this.getService.getQuarterlyAchievement(payload).subscribe(res =>{
  if(res.length > 0){
    this.targetForm.patchValue(res[0])
    this.targetForm.controls['accreditationDate'].setValue(this.sharedService.convertToInputDate(res[0].accreditationDateString))
    this.targetForm.controls['accreditationValidityDate'].setValue(this.sharedService.convertToInputDate(res[0].accreditationValidityDateString))
    this.targetForm.controls['dateOfSamarthAdoption'].setValue(this.sharedService.convertToInputDate(res[0].dateOfSamarthAdoptionString))
    this.lockStatus = res[0].lockStatus
    this.lockButtonIsVisible = true
    this.quaterlySaveButtonName = 'Update'
    this.formDisabledAndEnable()
  }
  else{
    const field1Value = this.targetForm.get('financialYear')?.value;
    const field2Value = this.targetForm.get('financialQuarter')?.value;
    this.targetForm.reset()
    this.targetForm.controls['financialYear'].setValue(field1Value);
    this.targetForm.controls['financialQuarter'].setValue(field2Value);
    this.quaterlySaveButtonName = 'Save'
    // this.lockButtonIsVisible = false
    this.lockStatus = false 
    this.targetForm.enable()
  }

})

}


formDisabledAndEnable(){
   this.lockStatus == true ? this.targetForm.disable() : this.targetForm.enable()
   this.lockStatus == true ? this.achivementForm.disable() : this.achivementForm.enable()
   if(this.viewSection){
    this.targetForm.controls["financialYear"].disable()
    this.targetForm.controls["financialQuarter"].disable()
    return
   }
  this.targetForm.controls["financialYear"].enable()
  this.targetForm.controls["financialQuarter"].enable()


}







getMoocTargetAchivement(){
  let payload:any = {
  aisheCode : this.aisheCode,
  componentId : this.componentId,
  financialYear : this.targetForm.get("financialYear")?.value,
  financialQuarter : this.targetForm.get("financialQuarter")?.value,
  isTargetAchievement : 'A'
  }
  this.getService.getMOOCTargetAchivement(payload).subscribe(res => {
    if(res.length > 0){
    this.patchMoocTargets(res);
    this.moocSaveButtonName = 'Update'
    this.formDisabledAndEnable()
  }
  else{
    this.achivementForm.reset()
    this.loadMoocCategories()
    const field1Value = this.targetForm.get('financialYear')?.value;
    const field2Value = this.targetForm.get('financialQuarter')?.value;
    this.targetForm.controls['financialYear'].setValue(field1Value);
    this.targetForm.controls['financialQuarter'].setValue(field2Value);
     this.moocSaveButtonName = 'Save'
     
  }

  })
}

getCategoryName(moocId: number): string {
  return this.moocCategoryMaster.find(c => c.id === moocId)?.name || '';
}


createMoocRow(data?: any): FormGroup {
  return this.fb.group({
    id : [data?.id || 0],
    category: [this.getCategoryName(data?.moocId)],
    distinctMoocOffer: [data?.distinctMoocOffer || 0],
    totalEnrolment: [data?.totalEnrolment || 0],
    femaleEnrolment: [data?.femaleEnrolment || 0],
    scStObcTransEnrolment: [data?.scStObcTransEnrolment || 0],
    totalCompletion: [data?.totalCompletion || 0],
    femaleCompletion: [data?.femaleCompletion || 0],
    scStObcTransCompletion: [data?.scStObcTransCompletion || 0]
  });
}

patchMoocTargets(apiData: any[]) {
  const fa = this.moocTargets;
  fa.clear();
  apiData.forEach(item => {
    fa.push(this.createMoocRow(item));
  });

}



saveAchievement(){
 if (!this.validateTargetForm()) {
    return;
}

const formValue = this.targetForm.value;
let lockOrForwarded = false
  let payload = [{
    id: Number(formValue.id) || 0,  
    aisheCode: String(this.aisheCode),
    componentId: Number(this.componentId),
    stateId: this.stateCode,
    districtId: this.districtCode,
    financialYear: Number(formValue.financialYear),
    financialQuarter: Number(formValue.financialQuarter),
    isYourHeiCurrentlyAccredited: formValue.isYourHeiCurrentlyAccredited,
            accreditationDate: formValue.accreditationDate,
            accreditationCycle:formValue.accreditationCycle,
            accreditationScore :formValue.accreditationScore,
            accreditationValidityDate: formValue.accreditationValidityDate,
            accreditationGrade:formValue.accreditationGrade,
            isSamarthErpAdopted:formValue.isSamarthErpAdopted,
            isOtherErp :formValue.isOtherErp,
            dateOfSamarthAdoption: formValue.dateOfSamarthAdoption,
            // dateOfOtherErpAdoption: formValue.dateOfOtherErpAdoption,
            remarkErp: formValue.remarkErp,
            isRegisteredAbc : formValue.isRegisteredAbc,
            isOfferingMee: formValue.isOfferingMee,
            researchPaperPublish: formValue.researchPaperPublish,
            researchPatentGrant: formValue.researchPatentGrant,
            eaiWorkshop : formValue.eaiWorkshop,
            eaiTotalParticipant: formValue.eaiTotalParticipant,
            eaiFemale: formValue.eaiFemale,
            eaiScStObcTrans: formValue.eaiScStObcTrans,
            eaiPwd : formValue.eaiPwd,
            eaiExpectedCompletion: formValue.eaiExpectedCompletion,
            eaiIsDisabilityInclusiveInfraSession: formValue.eaiIsDisabilityInclusiveInfraSession,
            // accreditationDateString: formValue.accreditationDateString,
            // accreditationValidityDateString: formValue.accreditationValidityDateString,
            // dateOfSamarthAdoptionString: formValue.dateOfSamarthAdoptionString

  }]
  this.postService.postAchievement(payload, lockOrForwarded).subscribe(res =>{
    if(res.status == 200){
      formValue.id == null ? this.notification.showSuccessMessage(res.message) : this.notification.showSuccessMessage('PmUsha Quarterly Achievement Updated Successfully.')
      this.getAchievementData()
      this.quaterlySaveButtonName = 'Update'
      

    }
  })

}


lock(){
  if (!this.targetForm.value.id || !this.moocTargets.value[0].id) {
  this.notification.showErrorMessage(
    'Both Target and Achievement must be saved before Locking.'
  );
  return;
}
const formValue = this.targetForm.value;
let lockOrForwarded = true
let payload = [{
    id: Number(formValue.id) || 0,  
    lockStatus : true
  }]
  
  this.postService.postAchievement(payload, lockOrForwarded).subscribe(res => {
    if(res.status == 200){
       this.lockStatus = true
      this.notification.showSuccessMessage('PmUsha Quarterly Target Locked Successfully.')
      this.formDisabledAndEnable()
    }
  })
}


saveMoochAchivements(){
  const hasAnyValue = this.moocTargets.controls.some(ctrl => 
    Object.entries(ctrl.value)
      .filter(([key, _]) => key !== 'id' && key !== 'category')
      .some(([_, v]) => v !== null && v !== '')
  );

  if (!hasAnyValue) {
    this.notification.showErrorMessage('Please fill at least one field');
    return;
  }

  const fy = this.targetForm.get('financialYear')?.value;
  const fq = this.targetForm.get('financialQuarter')?.value;


  const payload = this.moocTargets.value.map((row: any, index: number) => ({

    id: row.id ?? 0, // or row.id if coming from API
    aisheCode: String(this.aisheCode),
    componentId: Number(this.componentId),
    stateId: this.stateCode,
    districtId: this.districtCode,
    financialYear: Number(fy),
    financialQuarter: Number(fq),
    moocId: index + 1,
    distinctMoocOffer: Number(row.distinctMoocOffer),
    totalEnrolment: Number(row.totalEnrolment),
    femaleEnrolment: Number(row.femaleEnrolment),
    scStObcTransEnrolment: Number(row.scStObcTransEnrolment),
    totalCompletion: Number(row.totalCompletion),
    femaleCompletion: Number(row.femaleCompletion),
    scStObcTransCompletion: Number(row.scStObcTransCompletion),
    isTargetAchievement: 'A'
    
  }));

  
  this.postService.postQuarterlyAchievement(payload).subscribe(res => {

    if(res.status == 200){
      this.notification.showSuccessMessage(res.message)
      this.getMoocTargetAchivement()
      this.moocSaveButtonName = 'Update'
    }
    // else{
    //   this.notification
    // }
    

  })


}



limit5(e: any) {
  if (e.target.value.length > 5) {
    e.target.value = e.target.value.slice(0, 5);
  }
}


validateTargetForm(): any {
  let isValid = true;
  const setError = (controlName: string) => {
    this.targetForm.get(controlName)?.setErrors({ required: true });
    this.targetForm.get(controlName)?.markAsTouched();
    isValid = false;
  };

  if (this.targetForm.value.isYourHeiCurrentlyAccredited  === null) {
      setError('isYourHeiCurrentlyAccredited');
    }

  if (this.targetForm.value.isYourHeiCurrentlyAccredited === true) {
    if (!this.targetForm.value.accreditationDate) {
      setError('accreditationDate');
    }
    if (!this.targetForm.value.accreditationCycle) {
      setError('accreditationCycle');
    }
     if (!this.targetForm.value.accreditationScore) {
      setError('accreditationScore');
    }
     if (!this.targetForm.value.accreditationValidityDate) {
      setError('accreditationValidityDate');
    }
    if (!this.targetForm.value.accreditationGrade) {
      setError('accreditationGrade');
    }
   
  }

if (this.targetForm.value.isSamarthErpAdopted  === null) {
      setError('isSamarthErpAdopted');
    }

  if (this.targetForm.value.isSamarthErpAdopted === true) {
    if (!this.targetForm.value.dateOfSamarthAdoption) {
      setError('dateOfSamarthAdoption');
    }
    if (!this.targetForm.value.remarkErp) {
      setError('remarkErp');
    }
    
  }
  if (this.targetForm.value.isRegisteredAbc  === null) {
      setError('isRegisteredAbc');
    }
    if (this.targetForm.value.isOfferingMee  === null) {
      setError('isOfferingMee');
    }



return isValid;
}


}
