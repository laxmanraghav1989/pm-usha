import { Component, OnInit } from '@angular/core';
import { ImageDialogComponent } from '../dialog/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { routes } from '../routes';

@Component({
  selector: 'cfs-more-gallery',
  templateUrl: './more-gallery.component.html',
  styleUrls: ['./more-gallery.component.scss']
})
export class MoreGalleryComponent implements OnInit {
  public routers: typeof routes = routes;
  
  images = [
    'assets/images/gujarat/15.JPG', 'assets/images/gujarat/16.JPG',
    'assets/images/gujarat/17.JPG', 'assets/images/gujarat/18.JPG',
    'assets/images/gujarat/19.JPG', 'assets/images/gujarat/20.JPG',
    'assets/images/gujarat/21.JPG', 'assets/images/gujarat/22.JPG',
    'assets/images/gujarat/23.JPG', 'assets/images/gujarat/24.JPG',
    'assets/images/gujarat/25.JPG', 'assets/images/gujarat/26.JPG',
    'assets/images/gujarat/27.JPG', 'assets/images/gujarat/28.JPG',
    'assets/images/gujarat/29.JPG', 'assets/images/gujarat/30.JPG',
    'assets/images/gujarat/31.JPG', 'assets/images/gujarat/32.JPG',
    'assets/images/gujarat/33.JPG', 'assets/images/gujarat/34.JPG'
    
  ];
  
  activeIndex = 0;
  currentPage = 0;
  imagesPerPage = 9;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.images.length / this.imagesPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i);
  }

  get paginatedImages() {
    const start = this.currentPage * this.imagesPerPage;
    return this.images.slice(start, start + this.imagesPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  goToPage(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  openDialog(image: string[], index: number) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: image, index },
      width: '80%',
      maxWidth: '700px',
    });
  }
}
