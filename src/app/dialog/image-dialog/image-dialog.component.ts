import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cfs-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  images: string[];
  activeIndex: number;
  intervalId: any;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[], index: number }
  ) {
    this.images = data.images;
    this.activeIndex = data.index;
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextImage() {
    this.activeIndex = (this.activeIndex < this.images.length - 1) ? this.activeIndex + 1 : 0;
  }

  prevImage() {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.images.length - 1;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000); // Auto-slide every 3 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  closeDialog() {
    this.stopAutoSlide();  // Stop auto-sliding before closing
    this.dialogRef.close();
  }
}