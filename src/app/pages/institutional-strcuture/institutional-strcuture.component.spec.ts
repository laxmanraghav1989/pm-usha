import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalStrcutureComponent } from './institutional-strcuture.component';

describe('InstitutionalStrcutureComponent', () => {
  let component: InstitutionalStrcutureComponent;
  let fixture: ComponentFixture<InstitutionalStrcutureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionalStrcutureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalStrcutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
