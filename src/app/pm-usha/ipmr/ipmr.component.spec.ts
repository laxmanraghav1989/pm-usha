import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmrComponent } from './ipmr.component';

describe('IpmrComponent', () => {
  let component: IpmrComponent;
  let fixture: ComponentFixture<IpmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
