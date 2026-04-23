import { Component, OnDestroy, OnInit } from "@angular/core";
import { routes } from "src/app/routes";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { EncryptDecrypt } from "src/app/utility/encrypt-decrypt";
import { ExcelService } from 'src/app/service/excel.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "cfs-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.scss"],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  editCheck: boolean = false;
  editCheck1: boolean = true;
  userId: any;
  userList: Array<any> = [];
  componentList: any = [];
  fiterComponentList:any = []
  tempUser: Array<any> = [];
  fillArray: Array<any> = [];
  searchText: any;
  userTypeList: Array<any> = [];
  projectStatusList: Array<any> = [{id:true, value : 'Yes'},{value : 'No', id:false}];
  userTypeList1: Array<any> = [];
  userType: any = "ALL";
  componentName1: any = "ALL";
  projectStatusType:any = true
  stateCode: any;
  userTypeId: any;
  componentName: string;
  genderList: Array<any> = [];
  variables: Array<any> = [];
  stateList: Array<any> = [];
  stateId: any = "ALL";
  userChangeType: any;
  consutantTsgView: boolean;
  allSelected = false;
  selectedItemList: any;
  private dialog: MatDialog
  userNpdTypeList: boolean;
  isComponentVisible:boolean = false;
  isStateVisible:boolean = false;
  constructor(
    public api: ApiService,
    public sharedService: SharedService,
    public getService: GetService,
    public postService: PostService,
    public notification: NotificationService,
    public common: Common,
    public encrypt: EncryptDecrypt,
    public masterService: MasterService,
    private excelService: ExcelService
  ) {
    this.stateCode = sessionStorage.getItem("stateCode");
    this.userTypeId = sessionStorage.getItem("userTypeId");
    this.userId = sessionStorage.getItem("userName");
    this.getUserType();
    this.getComponentName();
  }

  ngOnInit(): void {
    this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id
    this.getGender();
    if (
      this.userTypeId === this.sharedService.userTypeList["0"].id ||
      this.userTypeId === this.sharedService.userTypeList["6"].id ||
      this.userTypeId === this.sharedService.userTypeList["7"].id ||
      this.userTypeId === this.sharedService.userTypeList["10"].id ||
      this.userTypeId === this.sharedService.userTypeList["8"].id ||
      this.userTypeId === this.sharedService.userTypeList["9"].id
    ) {
      this.getStateList();
    }
  }

toggleAllSelection() {
    this.allSelected = this.allSelected;
    this.userList.forEach(item => item.selected = this.allSelected);
    // this.paginatedList.forEach(item => item.selected = this.allSelected);
}

checkIfAllSelected() {
    this.allSelected = this.userList.every(item => item.selected);

}
sendEmail() {
    this.selectedItemList = [];
    this.selectedItemList = this.userList.filter((item) => item.selected == true);
    if (this.selectedItemList.length > 0) {
      this.common.emailSMS(this.selectedItemList)
    } else {
      this.notification.showValidationMessage("Please select atleast one email");
    }

  }

  // openDialog(data: any) {
  //   const dialogRef = this.dialog.open(EmailSmsDialogComponent, {
  //     width: '80%',
  //     height: '100%',
  //     data: {
  //       array: this.selectedItemList,
  //       // cc: this.ccAllowed,
  //     },
  //   });
  //   return;

  // }
  getStateList() {
    this.masterService.getStateData().subscribe(
      (res) => {
        this.variables = res;
        this.stateList = this.variables.slice();
      },
      (err) => {}
    );
  }
  getGender() {
    this.masterService.getGenderList().subscribe(
      (res) => {
        this.genderList = res;
      },
      (err) => {}
    );
  }
  getUserType() {
    this.getService.getUserRole().subscribe(
      (res) => {
        this.userTypeList = res;
        if (
          this.userTypeId === this.sharedService.userTypeList["1"].id ||
          this.userTypeId === this.sharedService.userTypeList["2"].id ||
          this.userTypeId === this.sharedService.userTypeList["11"].id ||
          this.userTypeId === this.sharedService.userTypeList["12"].id
        ) {
          this.userTypeList = this.userTypeList.filter(
            (ele) =>
              ele.id === 4 ||
              ele.id === 5 ||
              ele.id === 6 ||
              ele.id === 12 ||
              ele.id === 13 ||
              ele.id === Number(this.userTypeId) ||
              ele.id === Number(this.userTypeId == 2 ? 3 : 2)
          );
        } else {
          this.userTypeList;
        }
      },
      (err) => {}
    );
  }

  statusUpdate(e: any, status: any, data: any): void {
    if (this.sharedService.userTypeList["0"].id !== this.userTypeId || this.sharedService.userTypeList["8"].id !== this.userTypeId) {
      if (data.userName === this.userId) {
        this.notification.showValidationMessage("You are not authorized !!!");
        return;
      }
    }
    if (
      this.sharedService.userTypeList["2"].id === this.userTypeId ||
      this.sharedService.userTypeList["11"].id === this.userTypeId
    ) {
      if (
        this.sharedService.userTypeList["1"].id === data.userTypeId.toString()
      ) {
        this.notification.showValidationMessage("You are not authorized !!!");
        return;
      }
    }
    var value;
    if (status) {
      value = {
        alreadyExist: true,
        message: "Do you want to make this User " + e + " Inactive?",
        data: e,
        action: status,
      };
    } else {
      value = {
        alreadyExist: true,
        message: "Do you want to make this User " + e + " active?",
        data: e,
        action: status,
      };
    }

    //this.common.error(value)
    this.common.error(value).subscribe((whatever: boolean) => {
      if (whatever) {
        this.getUser();
      }
    });
  }

  // statusUpdateInactive(e: any) {
  //   let value = {
  //     alreadyExist: true,
  //     message: 'Do you want to make this User ' + e + ' active?',
  //     data: e,
  //     action: 'inactive',
  //   };
  //   //this.common.error(value)
  //   this.common.error(value).subscribe((whatever: boolean) => {

  //     if (whatever) {
  //       this.getUser()
  //     }
  //   })
  // }

  go() {
    this.getUser();
  }

  getUser() {
    const stateCode = [
      this.sharedService.userTypeList["1"].id,
      this.sharedService.userTypeList["2"].id,
      this.sharedService.userTypeList["11"].id,
    ].includes(this.userTypeId)
      ? this.stateCode
      : this.stateId;
    this.postService.getAllViewUser(stateCode, this.userType, this.projectStatusType).subscribe(
      (res) => {
        if (res && res.length) {
          let thiuserList1s = res.map((e) => ({
            ...e,
            name: `${e.firstName || ""} ${e.middleName || ""} ${
              e.lastName || ""
            }`.trim(),
          }));

          if (
            [
              this.sharedService.userTypeList["1"].id,
              this.sharedService.userTypeList["2"].id,
              this.sharedService.userTypeList["11"].id,
            ].includes(this.userTypeId)
          ) {
            this.userList = thiuserList1s.filter(
              (e) => e.userTypeId !== this.sharedService.userTypeList["0"].id
            );
            this.tempUser = [...this.userList];
          } else {
            this.tempUser = [...thiuserList1s];
          }
          this.find();
          if (this.userType === 7){
            this.consutantTsgView = true;
          }
          else{
            this.consutantTsgView = false;
          }
          this.handlePageChange((this.sharedService.page = 1));
        }
      },
      (err) => {
        console.error("Error fetching users:", err);
      }
    );
  }

  find() {
    let filteredUsers = this.tempUser
      .map((el) => {
        try {
          return {
            ...el,
            emailId: this.encrypt.getDecryptedValue(el?.emailId),
            mobile: this.encrypt.getDecryptedValue(el?.mobile),
          };
        } catch (error) {
          console.error("Failed to decrypt item:", el, error);
          return null;
        }
      })
      .filter(Boolean);

    const filters = [
      this.userType !== "ALL"
        ? (user) => user.userTypeId === this.userType
        : null,
      this.stateId !== "ALL" ? (user) => user.stateCode === this.stateId : null,
      this.componentName1 !== "ALL"
      ? (user) => Array.isArray(user.componentId) && user.componentId.includes(Number(this.componentName1))
      : null,
    ].filter(Boolean);

    this.userList = filters.length
      ? filteredUsers.filter((user) => filters.every((filter) => filter(user)))
      : filteredUsers;

    this.fillArray = [...this.userList];

    if (!this.userList.length) {
      this.notification.showValidationMessage("No Data Found");
    }
  }

  getUserByType(value) {
    if (this.userType === "ALL") {
      this.userList = [...this.tempUser];
    } else {
      this.userList = this.tempUser.filter((ele) => ele.userTypeId === value);
      this.handlePageChange((this.sharedService.page = 1));
    }
  }
  getComponentSeach(value) {
    if (this.componentName1 === "ALL") {
      this.userList = [...this.tempUser];
    } else {
      this.userList = this.tempUser.filter(
        (ele) => ele.componentId[0] === value
      );
      this.handlePageChange((this.sharedService.page = 1));
    }
  }
  getByState(value) {
    if (this.stateId === "ALL") {
      this.userList = [...this.tempUser];
    } else {
      this.userList = this.tempUser.filter((ele) => ele.stateCode === value);
      this.handlePageChange((this.sharedService.page = 1));
    }
  }

  selectUserType(value: any) {
    this.userChangeType = value;
    
    if([2, 3, 4, 5, 6, 11, 12].includes(this.userChangeType)){
       this.isStateVisible = true
      if([4, 5, 6].includes(this.userChangeType)){
          this.isComponentVisible = true
      }
      else{
          this.isComponentVisible = false
      }
     
    }
    else{
      this.isStateVisible = false
      this.isComponentVisible = false
    }
    this.filterComponentWise();
  }

  getComponentName() {
    this.getService.getComponent().subscribe(
      (res) => {
        if (res && res.length) {
          this.fiterComponentList = res
          this.componentList = [...res];
        
        }
      },
      (err) => {}
    );
  }

  filterComponentWise(){
    let filteredList = [...this.fiterComponentList];
    if (
            this.userTypeId === this.sharedService.userTypeList["1"].id ||
            this.userTypeId === this.sharedService.userTypeList["2"].id ||
            this.userTypeId === this.sharedService.userTypeList["11"].id
          ) {
            filteredList = filteredList.filter(
              (ele) =>
                ele.id === 1 ||
                ele.id === 2 ||
                ele.id === 3 ||
                ele.id === 4 ||
                ele.id === 5
            );
            if (this.userChangeType == 4) {
              filteredList = filteredList.filter(
                (ele) => ele.id === 4 || ele.id === 5
              );
            } else if (this.userChangeType == 5) {
             filteredList = filteredList.filter(
                (ele) => ele.id === 1 || ele.id === 2
              );
            } else if (this.userChangeType == 6) {  
              filteredList = filteredList.filter(        
                (ele) => ele.id === 3
              );
            }
          }
           this.componentList = filteredList;
  }
  clear() {
    this.searchText = "";
    this.userType = "ALL";
    this.componentName1 = "ALL";
    this.stateId = "ALL";
    this.allSelected = false
    // this.getUser();

    if (
      this.userTypeId === this.sharedService.userTypeList["1"].id ||
      this.userTypeId === this.sharedService.userTypeList["2"].id ||
      this.userTypeId === this.sharedService.userTypeList["11"].id
    ) {
      this.stateCode = sessionStorage.getItem("stateCode");
    }
    if (this.userTypeId === this.sharedService.userTypeList["0"].id || this.userTypeId === this.sharedService.userTypeList["8"].id) {
      this.stateId = "ALL";
    }
    this.userList = [];
    this.handlePageChange((this.sharedService.page = 1));
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange((this.sharedService.page = 1));
  }

  async updateResults() {
    this.userList = [];
    this.userList = this.searchByValue(this.fillArray);
    this.handlePageChange((this.sharedService.page = 1));
  }

  // async updateResults1(){
  //   this.userList = []
  //   this.userList = this.searchByValue(this.tempUser);
  //   this.handlePageChange(this.sharedService.page = 1)
  // }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === "") {
        return true;
      } else {
        return (
          item.name
            ?.trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.userName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.userType
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.componentName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.designation
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.districtName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.stateName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.name
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.mobile
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase()) ||
          item.emailId
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase())
        );
      }
    });
  }
  handlePageChange(event: any) {
    this.sharedService.page = event;
    (this.sharedService.StartLimit =
      (this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      (this.sharedService.EndLimit =
        this.sharedService.StartLimit + Number(this.sharedService.pageSize));
    var a = Math.ceil(
      this.userList.length / Number(this.sharedService.pageSize)
    );
    if (a === event) {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.userList.length
      );
    } else {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.userList.length - 1
      );
    }
  }
  compareFn1(user1: any, user2: any) {
    return user1 && user2 ? user1 === user2 : user1 === user2;
  }
  editRow(data: any): void {
    this.editCheck = true;
    this.editCheck1 = false;
    this.userId = data.userName;
  }
  openPopup(data: any) {
    if (this.sharedService.userTypeList["0"].id !== this.userTypeId || this.sharedService.userTypeList["8"].id !== this.userTypeId) {
      if (data.userName === this.userId) {
        this.notification.showValidationMessage("You are not authorized !!!");
        return;
      }
    }
    if (
      this.sharedService.userTypeList["2"].id === this.userTypeId ||
      this.sharedService.userTypeList["11"].id === this.userTypeId
    ) {
      if (
        this.sharedService.userTypeList["1"].id === data.userTypeId.toString()
      ) {
        this.notification.showValidationMessage("You are not authorized !!!");
        return;
      }
    }

    data["genderList"] = this.genderList;
    this.common.userAction(data).subscribe((res) => { 
      if (res) {
        this.searchText = "";
        this.userType = this.userType ? this.userType : "ALL";
        this.componentName1 = this.componentName1 ? this.componentName1 : "ALL";
        if (
          this.userTypeId === this.sharedService.userTypeList["1"].id ||
          this.userTypeId === this.sharedService.userTypeList["2"].id ||
          this.userTypeId === this.sharedService.userTypeList["11"].id
        ) {
          this.stateCode = sessionStorage.getItem("stateCode");
        }
        if (this.userTypeId === this.sharedService.userTypeList["0"].id || this.userTypeId === this.sharedService.userTypeList["8"].id) {
          this.stateId = "ALL";
        }
        this.getUser();
      }
    });
  }
  UpdateRow(data: any) {
    if (
      data.emailId == "" ||
      data.name == "" ||
      data.mobile == "" ||
      data.userName == "" ||
      data.gender == ""
    ) {
      this.notification.showValidationMessage("Empty field not allowed");
      return;
    }
    let temp = {
      emailId: this.encrypt.getEncryptedValue(data.emailId),
      firstName: data.name,
      gender: data.gender,
      mobile: this.encrypt.getEncryptedValue(data.mobile),
      userName: data.userName,
      userType: data.userType,
      userTypeId: data.userTypeId,
    };

    this.postService.postUpdates(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.editCheck = false;
        this.userId = "";
      }
    });
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }

  exportToExcel() {


    if (this.userList.length != 0) {
      let custom_data = this.userList.map((item, index) => ({
        'S.No': index + 1,
        'User Id': item.userName,
        'User Type': item.userType,
        'Component Name': item.componentName,
        'Name': item.firstName,
        'Designation': item.designation,
        'Gender': item.gender=='1'?'Male':item.gender=='2'?'Female':item.gender=='3'?'Transgender':'',
        'Email': item.emailId,
        'Mobile': item.mobile,
        'State': item.stateName,
        'District': item.districtName,
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `${this.userType == 'ALL' ? this.userType : this.userList[0].userType}_${this.stateId == 'ALL' ? this.stateId : this.userList[0].stateName}`);
      // _${this.componentName1 == 'ALL' ? this.componentName1 : this.userList[0].componentName}

    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

}
