import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframForwordComponent } from './ifram-forword.component';

describe('IframForwordComponent', () => {
  let component: IframForwordComponent;
  let fixture: ComponentFixture<IframForwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframForwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframForwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
