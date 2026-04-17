import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePmushaListComponent } from './college-pmusha-list.component';

describe('CollegePmushaListComponent', () => {
  let component: CollegePmushaListComponent;
  let fixture: ComponentFixture<CollegePmushaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegePmushaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePmushaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
