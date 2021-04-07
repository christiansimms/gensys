import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRootComponent } from './reg-root.component';

describe('RegRootComponent', () => {
  let component: RegRootComponent;
  let fixture: ComponentFixture<RegRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
