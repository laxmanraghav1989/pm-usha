import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeruUniverComponent } from './view-meru-univer.component';

describe('ViewMeruUniverComponent', () => {
  let component: ViewMeruUniverComponent;
  let fixture: ComponentFixture<ViewMeruUniverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeruUniverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeruUniverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
