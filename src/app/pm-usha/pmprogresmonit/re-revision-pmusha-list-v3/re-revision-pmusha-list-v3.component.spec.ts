import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRevisionPmushaListV3Component } from './re-revision-pmusha-list-v3.component';

describe('ReRevisionPmushaListV3Component', () => {
  let component: ReRevisionPmushaListV3Component;
  let fixture: ComponentFixture<ReRevisionPmushaListV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReRevisionPmushaListV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRevisionPmushaListV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
