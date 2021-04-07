import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartHomeComponent } from './start-home.component';

describe('StartHomeComponent', () => {
  let component: StartHomeComponent;
  let fixture: ComponentFixture<StartHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
