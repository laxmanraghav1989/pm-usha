import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMappingComponent } from './component-mapping.component';

describe('ComponentMappingComponent', () => {
  let component: ComponentMappingComponent;
  let fixture: ComponentFixture<ComponentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
