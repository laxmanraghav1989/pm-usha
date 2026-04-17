import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'cfs-item-tagging-dialog',
  templateUrl: './item-tagging-dialog.component.html',
  styleUrls: ['./item-tagging-dialog.component.scss']
})
export class ItemTaggingDialogComponent implements OnInit {
  infraForm: FormGroup;
  UpdatedropList: Array<any> = [];
  viewId: any;
  criteriaIdValue: any;
  isFormInvalid: boolean = false
  UpdatedropListArr: any[];
  refList: any;
  itemView: boolean;
  isCapicity: boolean;

  constructor(public dialogRef: MatDialogRef<ItemTaggingDialogComponent>, public fb: FormBuilder, public masterService: MasterService, @Inject(MAT_DIALOG_DATA) public data: any, public postService: PostService, public notification: NotificationService, public sharedService: SharedService, public getService: GetService) { }

  ngOnInit(): void {
  this.viewId = this.dialogRef.id;
  console.log('66', this.viewId)
  this.criteriaIdValue = this.data;
  if (this.viewId) {
    console.log('3')
  this.getTagDropValue(this.criteriaIdValue.proposalActivityId?this.criteriaIdValue.proposalActivityId:this.viewId)
  this.itemView = true
  }

  this.refActivity()
  this.infraForm = this.fb.group({
    proposalActivityId: [''],
    proposalItemTaggingId: [[], Validators.required],
    capacity: [''],
    costBreakup: [''],
    items: this.fb.array([])
  });

  this.infraLoad()
  }

  get items(): FormArray {
  return this.infraForm.get('items') as FormArray;
  }


  infraLoad(){
    this.infraForm.get('proposalItemTaggingId').setValue(this.data?.proposalItemTagging)
    this.infraForm.get('proposalActivityId').setValue(this.criteriaIdValue?.proposalActivityId?this.criteriaIdValue?.proposalActivityId:this.viewId)
    // this.infraForm.get('capacity').setValue(this.data?.capacity)
  }

  refActivity(){
     this.getService.getProposalActivity().subscribe((res) => {
      if(res){
        this.refList = res.filter(e => (e.id === 1 || e.id === 2 || e.id === 3 || e.id === 4))
      }
     })
  }

 getTagDropValue(id: any) {
  this.masterService.getTagging(id).subscribe(res => {
    if (res && res.length) {

      this.UpdatedropList = res;
      this.UpdatedropListArr = this.UpdatedropList.slice();

      this.items.clear();

      const capacityData = this.data?.proposalItemTaggingCapacity || [];

      capacityData.forEach((cap: any) => {

        if (cap.capacity || cap.costBreakup) {   // only filled capacity

          const item = this.UpdatedropList.find(x => x.id === cap.proposalItemTagId);

          if (item && (item.isCapacityField || item.isCostField)) {
            this.items.push(
              this.fb.group({
                proposalItemTagId: cap.proposalItemTagId,
                proposalItemTagName: cap.proposalItemTagName,
                isCapacityField: item.isCapacityField,
                isCostField: item.isCostField,
                capacity: [cap.capacity || ''],
                costBreakup: [cap.costBreakup || '']
              })
            );
          }

        }

      });

    }
  }, err => {
    console.error('Error fetching tagging:', err);
  });
}

  onSelection(event: any) {
    const selectedValues = event.value;
    if (selectedValues){
      this.itemView = true
      this.getTagDropValue(selectedValues)
    }
    // this.allSelected = selectedValues.length-1 === this.UpdatedropList.length;
  }

    allSelected = false;
  //   onSelectionChange(event: any) {
  //   const selectedValues = event.value;
  //   const fullResponse = this.UpdatedropList;
  //   const filteredResult = fullResponse.filter(item =>
  //     selectedValues.includes(item.id) && item.isCapacityField === true
  //   );
  //   if (filteredResult.length > 0){
  //     this.isCapicity = true;
  //   }
  //   else {
  //     this.isCapicity = false;
  //     this.infraForm.controls['capacity'].reset();
  //   }
  //   this.allSelected = selectedValues.length-1 === this.UpdatedropList.length;
  // }

onSelectionChange(event: any) {
  const selectedIds = event.value;

  // Save existing capacities
  const existingItems = this.items.value;

  this.items.clear();

  selectedIds.forEach((id: any) => {
    const item = this.UpdatedropList.find(x => x.id === id);

    if (item?.isCapacityField || item?.isCostField) {

      // check if capacity already exists
      const existing = existingItems.find((x: any) => x.proposalItemTagId === id);

      this.items.push(
        this.fb.group({
          proposalItemTagId: id,
          proposalItemTagName: item.name,
          isCapacityField: item.isCapacityField,
          isCostField: item.isCostField,
          capacity: [existing ? existing.capacity : ''],   // preserve old value
          costBreakup: [existing ? existing.costBreakup : '']   // preserve old value
        })
      );
    }
  });

  // Update allSelected flag
  const capacityItemCount = this.UpdatedropList.filter(i => i.isCapacityField).length;

  const selectedCapacityCount = selectedIds.filter((id: any) => {
    const item = this.UpdatedropList.find(x => x.id === id);
    return item?.isCapacityField;
  }).length;

  // this.allSelected = selectedCapacityCount === capacityItemCount;
}
  onDropCapicityValue(value:any) {
    const selectedValue = this.data?.proposalItemTagging;
    if (selectedValue) {
      const fullResponse1 = value;
      const capFilterResult = fullResponse1.filter(item =>
        selectedValue.includes(item.id) && item.isCapacityField === true
      );
      if (capFilterResult.length > 0){
        this.isCapicity = true;
      }
      else {
        this.isCapicity = false;
        this.infraForm.controls['capacity'].reset();
        this.infraForm.controls['costBreakup'].reset();
      }
    }
    
  }

toggleSelectAll() {
  const existingItems = this.items.value;
  if (this.allSelected) {
    this.infraForm.get('proposalItemTaggingId')?.setValue([]);
    this.items.clear();
    this.allSelected = false;

  } else {
    // ✅ only visible dropdown items
    const visibleIds = this.UpdatedropListArr.map(i => i.id);

    this.infraForm.get('proposalItemTaggingId')?.setValue(visibleIds);

    this.items.clear();

    this.UpdatedropListArr
      .filter(i => i.isCapacityField || i.isCostField)
      .forEach(item => {

        const existing = existingItems.find(
          (x: any) => x.proposalItemTagId === item.id
        );

        
        this.items.push(
          this.fb.group({
            proposalItemTagId: item.id,
            proposalItemTagName: item.name,
            isCapacityField: item.isCapacityField,
            isCostField: item.isCostField,
            capacity: [existing ? existing.capacity : ''],   // preserve old value
            costBreakup: [existing ? existing.costBreakup : '']   // preserve old value
          })
        );

      });

    this.allSelected = true;
  }
}

onConfirmClick() {
  if (this.infraForm.invalid) {
    this.notification.showWarning();
    return;
  }

  const allSelectedIds: number[] = this.infraForm.value.proposalItemTaggingId || [];
  const capacityItems = this.items.value; // only capacity items with capacity


  // Prepare payload for each selected item
  const proposalItemTagging = allSelectedIds.map(id => {
    const capItem = capacityItems.find((i: any) => i.proposalItemTagId === id);
    return {
      proposalItemTagId: id,
      proposalItemTagName: capItem?.proposalItemTagName || this.UpdatedropList.find(i => i.id === id)?.name || '',
      capacity: capItem?.capacity || '', // only for capacity items
      costBreakup: capItem?.costBreakup || '' // only for capacity items
    };
  });

  // Calculate total capacity
  const totalCapacity = capacityItems.reduce((sum: number, item: any) => sum + Number(item.capacity || 0), 0);
  const totalCostBreakup = capacityItems.reduce((sum: number, item: any) => sum + Number(item.costBreakup || 0), 0);
  let payload = [];
  if (this.criteriaIdValue.length > 0) {
    payload = this.criteriaIdValue.map(item => ({ 
          id: item.id || 0,
          proposalItemTaggingId: allSelectedIds, // all selected items (capacity + non-capacity)
          proposalActivityId: this.viewId,
          capacity: totalCapacity.toString(),
          costBreakup: totalCostBreakup.toString(),
          proposalItemTagging: proposalItemTagging
    }))
    this.postService.saveTagging(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      });
  }
  else {
    payload = [
        {
          id: this.criteriaIdValue?.id || 0,
          proposalItemTaggingId: allSelectedIds, // all selected items (capacity + non-capacity)
          proposalActivityId: this.viewId,
          capacity: totalCapacity.toString(),
          costBreakup: totalCostBreakup.toString(),
          proposalItemTagging: proposalItemTagging
        }
      ];

      this.postService.saveTagging(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      });
  }
  
}

  // onConfirmClick() {
  //   if (this.infraForm.invalid) {
  //         this.notification.showWarning();
  //         this.isFormInvalid = true;
  //         return;
  //       } else {
  //       this.isFormInvalid = false;
  //     }
  //     if (this.criteriaIdValue.length > 0) {
  //     let payload = this.criteriaIdValue.map(item => ({
  //         id: item.id,
  //         proposalItemTaggingId: this.infraForm.value.proposalItemTaggingId,
  //         proposalActivityId: this.viewId,
  //         capacity: this.infraForm.value.capacity? this.infraForm.value.capacity : ''
  //       }));
  //     this.postService.saveTagging(payload).subscribe(res => {
  //       if (res.status === 200) {
  //         this.notification.showSuccess();
  //         this.dialogRef.close(this.viewId);
  //       }
  //     }, err => {
  
  //     })
  //     }
  //     else {
  //       let payload = []
  //       payload.push({
  //             id: this.criteriaIdValue.id ? this.criteriaIdValue.id : 0,
  //             proposalItemTaggingId: this.infraForm.value.proposalItemTaggingId,
  //             proposalActivityId: this.viewId,
  //             capacity: this.infraForm.value.capacity ? this.infraForm.value.capacity : ''
  //           });
  //     this.postService.saveTagging(payload).subscribe(res => {
  //       if (res.status === 200) {
  //         this.notification.showSuccess();
  //         this.dialogRef.close(this.viewId);
  //       }
  //     }, err => {
  
  //     })
  //     }
     
  // }

  closeDialog(event: any): void {
    this.dialogRef.close();
  }

}
