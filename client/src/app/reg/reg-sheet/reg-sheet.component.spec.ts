import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSheetComponent } from './reg-sheet.component';

xdescribe('RegSheetComponent', () => {
  let component: RegSheetComponent;
  let fixture: ComponentFixture<RegSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
