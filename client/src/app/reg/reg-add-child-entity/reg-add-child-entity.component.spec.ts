import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAddChildEntityComponent } from './reg-add-child-entity.component';

describe('RegAddChildEntityComponent', () => {
  let component: RegAddChildEntityComponent;
  let fixture: ComponentFixture<RegAddChildEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegAddChildEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAddChildEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
