import {
  Directive,
  ElementRef,
  OnChanges,
  AfterViewInit,
  Renderer2,
  AfterViewChecked,
  Inject,
  OnInit
} from "@angular/core";
const hideConfig = {
  height: "20px",
  overFlowType: "hidden",
  buttonText: "[more...]"
};
const showConfig = {
  height: "max-content",
  overFlowType: "visible",
  buttonText: "[less...]"
};

@Directive({
  selector: '[appReadMore]'
})
export class ReadMoreDirective implements OnInit {

  readMore = false;
  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    if (this.el.nativeElement.offsetHeight > 50 && !this.readMore) {
      this.render(hideConfig);
    }
  }

  readMoreButtonclicked() {
    this.readMore = !this.readMore;
    const removableChild = document.getElementsByClassName("read-more")[0];
    if (removableChild) {
      this.el.nativeElement.parentNode.removeChild(removableChild);
    }
    this.readMore ? this.render(showConfig) : this.render(hideConfig);
  }

  render({ height, overFlowType, buttonText }) {
    this.el.nativeElement.style.height = height;
    this.el.nativeElement.style.overflow = overFlowType;
    const buttonEl = this._renderer.createElement("button");
    const text = this._renderer.createText(buttonText);
    this._renderer.appendChild(buttonEl, text);
    this._renderer.listen(buttonEl, "click", () => {
      this.readMoreButtonclicked();
    });
    this._renderer.addClass(buttonEl, "read-more");
    this._renderer.appendChild(this.el.nativeElement.parentNode, buttonEl);
  }
}
