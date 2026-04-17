import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-component-mapping',
  templateUrl: './component-mapping.component.html',
  styleUrls: ['./component-mapping.component.scss']
})
export class ComponentMappingComponent implements OnInit {
  public routers: typeof routes = routes;
  districtList: Array<any> = [];
  componentList: Array<any> = []
  stateCode: any;
  id: number;
  componentName: any;
  hyprlinkShow: boolean = true
  componentId: any;
  tempList:Array<any>=[]
  searchText: any;
  districtListMapped:Array<any>=[];
  districtListToBeMapped:Array<any>=[];
  tempListToBeMapped:Array<any>=[];
  selectedIndex:any=0
  isEsignDone:boolean=false
  constructor(public api: ApiService, public route: ActivatedRoute, public common: Common, public notification: NotificationService,
    public masterService: MasterService, public sharedService: SharedService, public getService:GetService,public encrypt:EncryptDecrypt) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.isEsignDone = this.encrypt.getDecryptedValue(sessionStorage.getItem('isEsignDone'))
    this.sharedService.getIns.subscribe(res => {
      this.districtListToBeMapped=[];
      this.districtListMapped=[]
      if (res !== 0) {
        this.componentId = res.toString();
        this.getDistrict();
      } else {
        this.componentId = this.route.snapshot.paramMap.get('id');
        this.getDistrict()
      }
    })


  }

  ngOnInit(): void {
    

  }
  tabSelected(event){
    this.selectedIndex = event.index
  }
  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res;
      this.componentName = this.componentList.find(ele => (ele.id).toString() === (this.componentId).toString()).componentName
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  
  getDistrict() {
    this.masterService.getDistrictList(this.stateCode).subscribe(res => {
      this.districtList = res.map(v => Object.assign(v, { checked: false, id: 0 }))
      // this.getFocusDis()
      this.getComponentList();
      this.getComponentInstitute();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  save() {
    // let array = this.districtListToBeMapped.filter(e => e.checked === true);
    // if (array.length === 0) {
    //   this.notification.showValidationMessage('Please select');
    //   return;
    // }
    // let temp=[]
    // temp = [...this.districtListMapped, ...this.districtListToBeMapped]
    let payload = []
    for (let index = 0; index < this.districtList.length; index++) {
      payload.push({
        "affiliatingUniversityId": null,
        "componentId": this.componentId,
        "districtId": this.districtList[index].distCode,
        "email": '',
        "firstName": '',
        "id": this.districtList[index].id,
        "instituteId": '',
        "mobile": '',
        "stateId": this.stateCode,
        "checked": this.districtList[index].checked,
        "genderId": null
      })

    }


    if (payload.length === 0) {
      this.notification.showValidationMessage('Please select !!!');
      return
    }
    this.api.saveComponentMapping(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getComponentInstitute();
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
  getComponentInstitute() {
    this.getService.getComponentInsMappingNMDCGENDER(this.stateCode,this.componentId).subscribe(res => {
      this.districtListToBeMapped=[];
      this.districtListMapped=[]
      this.districtList.forEach((ele: any,) => {
        res.forEach(obj => {
          if (ele.distCode === obj.districtId) {
            ele['checked'] = true,
              ele['id'] = obj.id
          }
        });
      })
      // for (let i = 0; i < this.districtList.length; i++) {
      // for (let j = 0; j < res.length; j++) {
      //   if (this.districtList[i].distCode === res[j].districtId) {
      //     // ele['checked'] = true,
      //     //   ele['id'] = obj.id

      //       this.districtListMapped.push({
      //         checked:true,
      //         id:res[j].id,
      //         name:this.districtList[i].name,
      //         distCode:this.districtList[i].distCode
      //       })
      //       this.districtList.splice(i,1)
      //   }
      // }
        
      // }
      // for (let k = 0; k < this.districtList.length; k++) {
      //  this.districtListToBeMapped.push({
      //   checked:false,
      //   id:0,
      //   name:this.districtList[k].name,
      //   distCode:this.districtList[k].distCode
      //  })
        
      // }
       this.tempList = [...this.districtList]
      // this.tempList = [...this.districtListMapped]
      // this.tempListToBeMapped = [...this.districtListToBeMapped]
      this.handlePageChange(this.sharedService.page = 1)
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
    var a = Math.ceil(this.districtList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.districtList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.districtList.length - 1);
    }

  }

  async updateResults() {
    this.districtList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.name.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
}
