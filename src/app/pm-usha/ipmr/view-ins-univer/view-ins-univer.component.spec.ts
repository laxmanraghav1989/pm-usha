import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsUniverComponent } from './view-ins-univer.component';

describe('ViewInsUniverComponent', () => {
  let component: ViewInsUniverComponent;
  let fixture: ComponentFixture<ViewInsUniverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsUniverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsUniverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
