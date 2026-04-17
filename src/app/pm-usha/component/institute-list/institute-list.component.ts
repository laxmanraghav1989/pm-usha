import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { GetService } from 'src/app/service/get.service';
import { DeleteService } from 'src/app/service/delete.service';
import { Common } from 'src/app/shared/common';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss']
})
export class InstituteListComponent implements OnInit {
  searchText: any;
  listData: Array<any> = [];
  tempList: Array<any> = [];
  districtList: Array<any> = [];
  componentList: Array<any> = []
  districtCode: any
  stateCode: any
  componentId: any
  componentName: string;
  showDropDown: boolean
  categoryType: string;
  genderList: Array<any> = [];
  focusDistrictList: Array<any> = [];
  variables: Array<any> = [];
  selectedIndex: any = 0;
  mappedList: Array<any> = [];
  tempListMapped: Array<any> = [];
  toBeMappedList: Array<any> = [];
  isEsignDone:boolean=false
  emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  constructor(public sharedService: SharedService, public api: ApiService, public notification: NotificationService,
    public route: ActivatedRoute, public masterService: MasterService, public getService: GetService, public deleteService: DeleteService,
    public common: Common,public encrypt: EncryptDecrypt) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.isEsignDone = this.encrypt.getDecryptedValue(sessionStorage.getItem('isEsignDone'))
    this.sharedService.getIns.subscribe(res => {
      this.districtCode = '0'
      this.selectedIndex = 0;
      this.mappedList = [];
      this.toBeMappedList = [];
      this.sharedService.StartLimit = 0;
      this.sharedService.EndLimit = 25;
      this.sharedService.pageData = 0;
      this.sharedService.pageSize = 25;
      this.sharedService.page = 1;
      this.searchText = ''
      if (res !== 0) {
        this.componentId = res;
        if (this.componentId === this.sharedService.meruComponentId || this.componentId === this.sharedService.universityComponentId) {
          this.getComponentList()
          this.showDropDown = false
          this.getInstituteListByStateCode()
          this.categoryType = 'U'
        }
        if (this.componentId === this.sharedService.collegeComponentId) {
          this.showDropDown = true
          this.getDistrict();
          this.categoryType = 'C'
          this.getMappedCollege()
        }
      } else {
        this.componentId = parseInt(this.route.snapshot.paramMap.get('id'));
        if (this.componentId === this.sharedService.meruComponentId || this.componentId === this.sharedService.universityComponentId) {
          this.getComponentList()
          this.showDropDown = false
          this.getInstituteListByStateCode()
          this.categoryType = 'U'
        }
        if (this.componentId === this.sharedService.collegeComponentId) {
          this.showDropDown = true
          this.getDistrict();
          this.categoryType = 'C'
          this.getMappedCollege()
        }
      }
    })
  }

  ngOnInit(): void {
    //this.getDistrict();
    this.getGender();

  }
  deleteCompenent(userId: any): void {
    this.common.delete().subscribe((res) => {
      if (res) {
        this.deleteService.deleteComponentMapping(userId).subscribe((res) => {
          if (res.status === 200) {
            this.mappedList = this.mappedList.filter((e) => e.id !== userId)
            this.handlePageChange(this.sharedService.page = 1, this.mappedList)
          }
        }, error => {

        })
      }
    })


  }
  getFocusDis() {
    this.focusDistrictList = [];
    this.getService.getFocusDistrict(this.stateCode).subscribe(
      (res) => {
        if (res.list && res.list.length) {
          this.focusDistrictList = res.list;
          this.focusDistrictList = this.focusDistrictList.map((v) => ({
            ...v,
            id: 0,
            checked: false,
            firstName: "",
            email: "",
            mobile: "",
            gender: null
          }));
        }
      },
      (err) => { }
    );
  }
  getGender() {
    this.masterService.getGenderList().subscribe(res => {
      this.genderList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
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
    this.toBeMappedList = [];
    this.tempList = [];
    this.masterService.getDistrictList(this.stateCode).subscribe(res => {
      this.variables = res;
      this.districtList = this.variables.slice()
      this.getComponentList()
       }, err => {
      console.error('Error fetching page status:', err);
    })


  }
  getInstituteListByStateCode() {
    this.getService.getInstituteByStateCode('U', this.stateCode).subscribe(res => {
      this.listData = res.institutes;
      this.listData = this.listData.map((v) => ({
        ...v,
        id: 0,
        checked: false,
        firstName: "",
        email: "",
        mobile: "",
        gender: null
      }));
      this.getComponentInstituteU()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getComponentInstituteU() {
    this.getService.getComponentInsMappingU('U', this.stateCode, this.componentId).subscribe(res => {
      this.mappedList = [];
      this.toBeMappedList = []
      for (let i = 0; i < this.listData.length; i++) {
        for (let j = 0; j < res.length; j++) {
          if (this.listData[i].aisheCode.trim('') === res[j].instituteId) {
            if (res[j].genderId === 1) {
              this.listData[i]['genderName'] = 'Male'
            } if (res[j].genderId === 2) {
              this.listData[i]['genderName'] = 'Female'
            } if (res[j].genderId === 3) {
              this.listData[i]['genderName'] = 'Trangender'
            }
            this.listData[i]['checked'] = true,
              this.listData[i]['id'] = res[j].id,
              this.listData[i]['firstName'] = res[j].firstName,
              this.listData[i]['email'] = res[j].email,
              this.listData[i]['mobile'] = res[j].mobile,
              this.listData[i]['gender'] = res[j].genderId

            this.mappedList.push({
              'firstName': res[j].firstName,
              'email': res[j].email,
              'mobile': res[j].mobile,
              'genderName': this.listData[i].genderName,
              'gender': res[j].genderId,
              'addressLine1': this.listData[i].addressLine1,
              'addressLin2': this.listData[i].addressLin2,
              'city': this.listData[i].city,
              'districtName': this.listData[i].districtName,
              'stateName': this.listData[i].stateName,
              'aisheCode': this.listData[i].aisheCode,
              'name': this.listData[i].name,
              'affiliatingUniversityName': this.listData[i].affiliatingUniversityName,
              'managementName': this.listData[i].managementName,
              'universityType': this.listData[i].universityType,
              'districtId': this.listData[i].districtId,
              'stateId': this.listData[i].stateId,
              'universityId': this.listData[i].universityId,
              'id': res[j].id,
              'checked': true,
              'status': res[j].status ? 'Filled' : 'Pending'
            })
            this.listData.splice(i, 1);
            i--;
            break;
          }




        }

      }
      for (let k = 0; k < this.listData.length; k++) {
        this.toBeMappedList.push({
          // 'firstName': '',
          // 'email': '',
          // 'mobile': '',
          // 'genderName': '',
          // 'gender': null,
          'addressLine1': this.listData[k].addressLine1,
          'addressLin2': this.listData[k].addressLin2,
          'city': this.listData[k].city,
          'districtName': this.listData[k].districtName,
          'stateName': this.listData[k].stateName,
          'aisheCode': this.listData[k].aisheCode,
          'name': this.listData[k].name,
          'affiliatingUniversityName': this.listData[k].affiliatingUniversityName,
          'managementName': this.listData[k].managementName,
          'universityType': this.listData[k].universityType,
          'districtId': this.listData[k].districtId,
          'checked': false,
          'stateId': this.listData[k].stateId,
          'universityId': this.listData[k].universityId,
          'id': 0,
          'status': 'Pending'
        })

      }
      this.tempList = [...this.toBeMappedList]
      this.tempListMapped = [...this.mappedList];
      if (this.selectedIndex === 0) {
        this.handlePageChange(this.sharedService.page = 1, this.mappedList)

      } else {
        this.handlePageChange(this.sharedService.page = 1, this.toBeMappedList)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getInstituteList(value: any) {
    this.getService.getInstitute('C', value, this.stateCode).subscribe(res => {
      this.listData = res.institutes;
      this.listData = this.listData.map((v) => ({
        ...v,
        id: 0,
        checked: false,
        firstName: "",
        email: "",
        mobile: "",
        gender: null
      }));
      this.getComponentInstitute()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getMappedCollege() {
    let districtCode = ''
    if (this.selectedIndex === 0) {
      districtCode = this.districtCode === '0' ? 'ALL' : this.districtCode
    } else {
      districtCode = this.districtCode
    }
    this.getService.getComponentInsMapping('C', this.stateCode, districtCode, this.componentId).subscribe(res => {
      this.mappedList = [];
      for (let j = 0; j < res.length; j++) {
        if (res[j].genderId === 1) {
          res[j]['genderName'] = 'Male'
        } if (res[j].genderId === 2) {
          res[j]['genderName'] = 'Female'
        } if (res[j].genderId === 3) {
          res[j]['genderName'] = 'Trangender'
        }
        this.mappedList.push({
          'firstName': res[j].firstName,
          'email': res[j].email,
          'mobile': res[j].mobile,
          'genderName': res[j].genderName,
          'gender': res[j].genderId,
          'instituteAddress': res[j].instituteAddress,
          'addressLine1': res[j].addressLine1,
          'addressLin2': res[j].addressLine2,
          'city': res[j].city,
          'districtName': res[j].districtName,
          'stateName': res[j].stateName,
          'aisheCode': res[j].instituteId,
          'name': res[j].instituteName,
          'affiliatingUniversityName': res[j].affiliatingUniversityName,
          'managementName': res[j].managementName,
          'universityType': res[j].universityType,
          'districtId': res[j].districtId,
          'stateId': res[j].stateId,
          'universityId': res[j].affiliatingUniversityId,
          'id': res[j].id,
          'checked': true,
          'status': res[j].status ? 'Filled' : 'Pending'
        })

      }
      this.tempListMapped = [...this.mappedList];
      this.handlePageChange(this.sharedService.page = 1, this.mappedList)
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getComponentInstitute() {

    this.getService.getComponentInsMapping('C', this.stateCode, this.districtCode, this.componentId).subscribe(res => {
      // this.mappedList = [];
      this.toBeMappedList = []

      for (let i = 0; i < this.listData.length; i++) {
        for (let j = 0; j < res.length; j++) {
          if (this.listData[i].aisheCode.trim('') === res[j].instituteId) {
            if (res[j].genderId === 1) {
              this.listData[i]['genderName'] = 'Male'
            } if (res[j].genderId === 2) {
              this.listData[i]['genderName'] = 'Female'
            } if (res[j].genderId === 3) {
              this.listData[i]['genderName'] = 'Trangender'
            }
            this.listData[i]['checked'] = true,
              this.listData[i]['id'] = res[j].id,
              this.listData[i]['firstName'] = res[j].firstName,
              this.listData[i]['email'] = res[j].email,
              this.listData[i]['mobile'] = res[j].mobile,
              this.listData[i]['gender'] = res[j].genderId
            this.listData.splice(i, 1);
            i--;
            break;
          }
        }

      }
      for (let k = 0; k < this.listData.length; k++) {
        this.toBeMappedList.push({
          // 'firstName': '',
          // 'email': '',
          // 'mobile': '',
          // 'genderName': '',
          // 'gender': null,
          'addressLine1': this.listData[k].addressLine1,
          'addressLin2': this.listData[k].addressLin2,
          'city': this.listData[k].city,
          'districtName': this.listData[k].districtName,
          'stateName': this.listData[k].stateName,
          'aisheCode': this.listData[k].aisheCode,
          'name': this.listData[k].name,
          'affiliatingUniversityName': this.listData[k].affiliatingUniversityName,
          'managementName': this.listData[k].managementName,
          'universityType': this.listData[k].universityType,
          'districtId': this.listData[k].districtId,
          'checked': false,
          'stateId': this.listData[k].stateId,
          'universityId': this.listData[k].universityId,
          'id': 0,
          'status': 'Pending'
        })

      }

      this.tempList = [...this.toBeMappedList];
      this.handlePageChange(this.sharedService.page = 1, this.toBeMappedList)

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    if (this.selectedIndex === 1) {
      this.handlePageChange(this.sharedService.page = 1, this.toBeMappedList)
    } if (this.selectedIndex === 0) {
      this.handlePageChange(this.sharedService.page = 1, this.mappedList)

    }
  }
  handlePageChange(event: any, list) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(list.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), list.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), list.length - 1);
    }

  }

  async updateResults() {
    if (this.selectedIndex === 1) {
      this.toBeMappedList = this.searchByValue(this.tempList);
      this.handlePageChange(this.sharedService.page = 1, this.toBeMappedList)
    } if (this.selectedIndex === 0) {
      this.mappedList = this.searchByValue(this.tempListMapped);
      this.handlePageChange(this.sharedService.page = 1, this.mappedList)
    }

  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.name?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.addressLine1?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.addressLine2?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.city?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.firstName?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.mobile?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.email?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
        //  || (item.gender?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.genderName?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
          || (item.status?.toLowerCase().toString().trim().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
  save() {
    let payload = [];
    let temp = [];
    let array = this.toBeMappedList.filter(e => e.checked === true);
    if (array.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    temp = [...this.mappedList, ...this.toBeMappedList]
    // temp.unshift(this.toBeMappedList)
    for (let index = 0; index < temp.length; index++) {
      // if (temp[index].checked) {
      // if (!(temp[index].email && temp[index].mobile && temp[index].name && temp[index].gender)) {
      //   this.notification.showValidationMessage('Please enter Nodal Officer Name,Email,Mobile,Gender !!!');
      //   return;
      // }
      // let result: boolean = this.emailRegex.test(temp[index].email);
      // if(!result){
      //   this.notification.showValidationMessage('Please enter valid email id');
      //   return;
      // }
      //  }
      //  let instituteAddress=''
      //  instituteAddress = temp[index].addressLine1.concat(" ",temp[index].addressLine2?temp[index].addressLine2:'',temp[index].city?temp[index].city:'');
      payload.push({
        "affiliatingUniversityId": temp[index].universityId,
        "affiliatingUniversityName": temp[index].affiliatingUniversityName,
        "componentId": this.componentId,
        "districtId": temp[index].districtId,
        // "email": temp[index].email,
        //  "firstName": temp[index].firstName.trim(''),
        "id": temp[index].id,
        "instituteId": temp[index].aisheCode.trim(''),
        //"mobile": temp[index].mobile,
        "stateId": temp[index].stateId,
        "checked": temp[index].checked ? true : false,
        // "genderId": temp[index].gender,
        "instituteName": temp[index].name,
        "city": temp[index].city,
        "addressLine1": temp[index].addressLine1,
        "addressLine2": temp[index].addressLin2,
        "managementName": temp[index].managementName,
        "universityType": temp[index].universityType
      })
    }
    // if (temp.length === 0) {
    //   this.notification.showValidationMessage('Please select !!!');
    //   return
    // }
    this.api.saveComponentMapping(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        if (this.componentId === this.sharedService.collegeComponentId) {
          this.getComponentInstitute();

        } else {
          this.getComponentInstituteU();

        }
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
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
  tabSelected(event) {
    this.selectedIndex = event.index
    this.clearFilter()
   // if (this.selectedIndex === 1) {
     // this.districtCode = 'ALL'
  //    this.getComponentInstitute(); 
   // } 
    // if (this.selectedIndex === 1) {
    //   this.districtCode = ''
    // }

  }
  clearFilter() {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    this.searchText = ''
    this.districtCode = '0'
    // this.toBeMappedList=[]
    // this.mappedList=[]
    if (this.selectedIndex === 0) {
      if (this.componentId === this.sharedService.collegeComponentId) {
        this.getMappedCollege()
      } else {
        this.getInstituteListByStateCode();
      }


    } else {
      this.handlePageChange(this.sharedService.page = 1, this.toBeMappedList)
    }

  }
  getInstituteListIndex0(value) {
    this.mappedList = this.tempListMapped.filter(e => e.districtId === value)
  }
  getCheckData(value, i) {
    if (!value) {
      this.toBeMappedList[i].firstName = ''
      this.toBeMappedList[i].email = ''
      this.toBeMappedList[i].mobile = ''
      this.toBeMappedList[i].mobile = ''
    }
  }
}
