import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedDprUploadComponent } from './revised-dpr-upload.component';

describe('RevisedDprUploadComponent', () => {
  let component: RevisedDprUploadComponent;
  let fixture: ComponentFixture<RevisedDprUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedDprUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedDprUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
