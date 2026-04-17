import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderDevelopementComponent } from './under-developement.component';

describe('UnderDevelopementComponent', () => {
  let component: UnderDevelopementComponent;
  let fixture: ComponentFixture<UnderDevelopementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderDevelopementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderDevelopementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
