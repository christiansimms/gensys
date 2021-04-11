import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJsonComponent } from './pre-json.component';

describe('PreJsonComponent', () => {
  let component: PreJsonComponent;
  let fixture: ComponentFixture<PreJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
