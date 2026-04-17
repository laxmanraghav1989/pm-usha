import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparisionMprDataComponent } from './comparision-mpr-data.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewportScroller } from '@angular/common';

import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { ApiService } from 'src/app/service/api.service';
import { ExcelService } from 'src/app/service/excel.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';

describe('ComparisionMprDataComponent', () => {
  let component: ComparisionMprDataComponent;
  let fixture: ComponentFixture<ComparisionMprDataComponent>;

  // ✅ Mocks
  const mockDialog = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(true)
    })
  };

  const mockSharedService = {
    page: 1,
    pageSize: 10,
    userTypeList: { "1": { id: '1' }, "2": { id: '2' }, "11": { id: '11' }, "12": { id: '12' } }
  };

  const mockMasterService = {
    getStateData: jasmine.createSpy('getStateData').and.returnValue(of([]))
  };

  const mockGetService = {
    getRusaProfressDataCompare: jasmine.createSpy().and.returnValue(of({ status: 200, data: [] })),
    getComponentName: jasmine.createSpy().and.returnValue(of([]))
  };

  const mockNotification = {
    showValidationMessage: jasmine.createSpy('showValidationMessage')
  };

  const mockExcelService = {
    exportToExcel: jasmine.createSpy('exportToExcel')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisionMprDataComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: SharedService, useValue: mockSharedService },
        { provide: MasterService, useValue: mockMasterService },
        { provide: GetService, useValue: mockGetService },
        { provide: NotificationService, useValue: mockNotification },
        { provide: ExcelService, useValue: mockExcelService },
        { provide: PostService, useValue: {} },
        { provide: ApiService, useValue: {} },
        { provide: Common, useValue: {} },
        { provide: CustomErrorStateMatcher, useValue: {} },
        { provide: ViewportScroller, useValue: { scrollToPosition: () => {} } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisionMprDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});