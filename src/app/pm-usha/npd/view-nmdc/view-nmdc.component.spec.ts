import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNmdcComponent } from './view-nmdc.component';

describe('ViewNmdcComponent', () => {
  let component: ViewNmdcComponent;
  let fixture: ComponentFixture<ViewNmdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNmdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNmdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
