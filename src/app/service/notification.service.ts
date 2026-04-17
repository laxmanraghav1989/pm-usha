import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastrService: ToastrService) { }
  showLoginSuccess() {
    this.toastrService.success('Login Sucessfully')
  }
  showSuccess() {
    this.toastrService.success('This record has been saved successfully!!!')
  }
  showUpdate() {
    this.toastrService.success('This record has been updated successfully!!!')
  }
  showDelete() {
    this.toastrService.success('This record has been deleted successfully!!!')
  }
  showRestore() {
    this.toastrService.success('This record has been Restore successfully!!!')
  }
  showWarning() {
    this.toastrService.error('Please enter required field!!!')
  }
  showValidationMessage(message: any) {
    this.toastrService.error(message);
  }
  showSuccessMessage(message: any) {
    this.toastrService.success(message)
  }
 showErrorMessage(message: any) {
    this.toastrService.error(message)
  }

  mandatory(){
    this.toastrService.error('All Fields are Mandatory!!!')
  }
  apiNotRespond() {
    this.toastrService.error(
      `Server could not respond,Please try again later!!!`
    );
  }
}
