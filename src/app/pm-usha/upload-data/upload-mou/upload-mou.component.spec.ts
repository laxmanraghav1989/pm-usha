import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMouComponent } from './upload-mou.component';

describe('UploadMouComponent', () => {
  let component: UploadMouComponent;
  let fixture: ComponentFixture<UploadMouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
