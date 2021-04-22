import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEntityComponent } from './reg-entity.component';

xdescribe('RegEntityComponent', () => {
  let component: RegEntityComponent;
  let fixture: ComponentFixture<RegEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
