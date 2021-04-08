import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegViewEntityComponent } from './reg-view-entity.component';

describe('RegViewEntityComponent', () => {
  let component: RegViewEntityComponent;
  let fixture: ComponentFixture<RegViewEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegViewEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegViewEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
