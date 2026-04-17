import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationCertificateModuleComponent } from './utilization-certificate-module.component';

describe('UtilizationCertificateModuleComponent', () => {
  let component: UtilizationCertificateModuleComponent;
  let fixture: ComponentFixture<UtilizationCertificateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizationCertificateModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationCertificateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
