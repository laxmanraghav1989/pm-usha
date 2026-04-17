import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';

@Component({
  selector: 'cfs-componentlist',
  templateUrl: './componentlist.component.html',
  styleUrls: ['./componentlist.component.scss']
})
export class ComponentlistComponent implements OnInit {
  public routers: typeof routes = routes;
  listData: Array<any> = [];
  mappingList:Array<any>=[]
  constructor(public api: ApiService, public router: Router, public common: Common,public notification:NotificationService, public getService:GetService ) {
    this.getComponentList();
    this.getComponentMappingList()
  }

  ngOnInit(): void {
  }
  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.listData = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getComponentMappingList() {
    this.getService.getMappingList(sessionStorage.getItem('userName')).subscribe(res => {
      this.mappingList = res
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  goToComponent(item) {
    if (item.id !== 3) {
      this.router.navigate([this.routers.ComponentWiseMapping, item.id, item.componentName])
    } else {
      let payload = {
        managementId: [2, 5],
        districtId: null,
        categoryType: 'C',
        typeId: null
      }
      this.getService.getInstitutionsDetails(payload).subscribe(res => {
        if (res.institutes && res.institutes.length) {
          if (this.mappingList && this.mappingList.length) {
            res.institutes.forEach(element => {
              this.mappingList.forEach(obj => {
                if (element.aisheCode === obj.instituteId) {
                  element['checked'] = true;
                  element['id']=obj.id
                } else {
                  element['checked'] = false
                  element['id']=0
                }
              });
            });
            this.common.institutionDetails(res.institutes, null, item.id).subscribe(res => {
              if (res) {
                this.getComponentMappingList();
              }
            })
          } else {
            this.common.institutionDetails(res.institutes, null, item.id).subscribe(res=>{
              if(res){
                this.getComponentMappingList();
              }
            })
  
          }
  
        } else {
          this.notification.showValidationMessage('No Record Found !!!')
        }
      }, err => {

      })
      
    }
  }

}
