import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeLockListComponent } from './college-lock-list.component';

describe('CollegeLockListComponent', () => {
  let component: CollegeLockListComponent;
  let fixture: ComponentFixture<CollegeLockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeLockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeLockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initial methods on init', () => {
  spyOn(component, 'getDateData');
  spyOn(component, 'getSateData');

  component.ngOnInit();

  expect(component.getDateData).toHaveBeenCalled();
  expect(component.getSateData).toHaveBeenCalled();
});
it('should filter data based on search text', () => {
  component.tempList = [
    { aisheCode: '123', institutionName: 'ABC College' },
    { aisheCode: '456', institutionName: 'XYZ College' }
  ];

  component.searchText = 'abc';

  const result = component.searchByValue(component.tempList);

  expect(result.length).toBe(1);
  expect(result[0].institutionName).toBe('ABC College');
});
it('should sort data in ascending order', () => {
  component.collegeListData = [
    { institutionName: 'B College' },
    { institutionName: 'A College' }
  ];

  component.sortDir = 1;
  component.sortArr('institutionName');

  expect(component.collegeListData[0].institutionName).toBe('A College');
});
it('should paginate data correctly', () => {
  component.extraArr = Array.from({ length: 50 }, (_, i) => ({ id: i }));

  component.pageIndexWork = 0;
  component.pageSizeWork = 10;

  component.updatePaginatedData();

  expect(component.paginatedDataState.length).toBe(10);
});
it('should update modified month correctly', () => {
  component.monthList = [
    { monthCode: '10', name: 'October' }
  ];

  component.ChangesCurrentMonth('10');

  expect(component.modiefiedMonth).toBe('October');
});
it('should show validation if month/year missing', () => {
  spyOn(component.notification, 'showValidationMessage');

  component.Find(null, null);

  expect(component.notification.showValidationMessage).toHaveBeenCalled();
});
it('should select all non-forwarded items', () => {
  component.collegeListData = [
    { isForwardedToNpd: false },
    { isForwardedToNpd: true }
  ];

  component.toggleSelectAll(true);

  expect(component.collegeListData[0].checked).toBeTrue();
  expect(component.collegeListData[1].checked).toBeUndefined();
});

});
