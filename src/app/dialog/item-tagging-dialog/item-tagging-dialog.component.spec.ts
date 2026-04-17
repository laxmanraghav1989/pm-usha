import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTaggingDialogComponent } from './item-tagging-dialog.component';

describe('ItemTaggingDialogComponent', () => {
  let component: ItemTaggingDialogComponent;
  let fixture: ComponentFixture<ItemTaggingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTaggingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTaggingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
