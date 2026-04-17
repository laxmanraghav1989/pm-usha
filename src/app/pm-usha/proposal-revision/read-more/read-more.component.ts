import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'cfs-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {
  @Input() anchor: string = 'Show more'; // default anchor text
  expand: boolean = false;
  showAnchor: boolean = false;

  @ViewChild('textbox') textbox!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
   
  }

  ngAfterViewChecked() {
    // Perform check after the view is initialized
    const textBoxElement = this.textbox.nativeElement;
    this.showAnchor = textBoxElement.offsetHeight < textBoxElement.scrollHeight || this.expand;
    
    // Mark for check after making changes to avoid expression change error
    this.cdr.detectChanges();
  }

  toggle() {
    this.expand = !this.expand;
  }
}