import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNmdcInsComponent } from './view-nmdc-ins.component';

describe('ViewNmdcInsComponent', () => {
  let component: ViewNmdcInsComponent;
  let fixture: ComponentFixture<ViewNmdcInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNmdcInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNmdcInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
