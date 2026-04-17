import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageDialogComponent } from '../dialog/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { routes } from '../routes';

@Component({
  selector: 'cfs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  constructor(private dialog: MatDialog) {}
  images = [
    'assets/images/gujarat/7.jpg',
    'assets/images/gujarat/8.jpg',
    'assets/images/gujarat/9.jpg',
    'assets/images/gujarat/10.jpg',
    'assets/images/gujarat/11.JPG',
    'assets/images/gujarat/12.JPG',
    'assets/images/gujarat/13.JPG',
    'assets/images/gujarat/14.JPG',
  ];
  activeIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prevImage() {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.images.length - 1;
  }

  nextImage() {
    this.activeIndex = (this.activeIndex < this.images.length - 1) ? this.activeIndex + 1 : 0;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000); // Change image every 3 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openDialog(image: any, index:number) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: image, index },
      width: '80%',
      maxWidth: '700px',
    });
  }
}
