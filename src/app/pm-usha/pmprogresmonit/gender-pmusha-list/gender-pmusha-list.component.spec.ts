import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderPmushaListComponent } from './gender-pmusha-list.component';

describe('GenderPmushaListComponent', () => {
  let component: GenderPmushaListComponent;
  let fixture: ComponentFixture<GenderPmushaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderPmushaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderPmushaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
