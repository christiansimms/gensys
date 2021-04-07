import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractFieldComponent } from './extract-field.component';

xdescribe('ExtractFieldComponent', () => {
  let component: ExtractFieldComponent;
  let fixture: ComponentFixture<ExtractFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
