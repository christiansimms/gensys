import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAddEntityComponent } from './reg-add-entity.component';

xdescribe('RegAddEntityComponent', () => {
  let component: RegAddEntityComponent;
  let fixture: ComponentFixture<RegAddEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegAddEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
