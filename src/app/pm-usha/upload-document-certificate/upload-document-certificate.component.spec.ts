import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentCertificateComponent } from './upload-document-certificate.component';

describe('UploadDocumentCertificateComponent', () => {
  let component: UploadDocumentCertificateComponent;
  let fixture: ComponentFixture<UploadDocumentCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocumentCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
