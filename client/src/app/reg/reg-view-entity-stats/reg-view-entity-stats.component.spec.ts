import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegViewEntityStatsComponent } from './reg-view-entity-stats.component';

xdescribe('RegViewEntityStatsComponent', () => {
  let component: RegViewEntityStatsComponent;
  let fixture: ComponentFixture<RegViewEntityStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegViewEntityStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegViewEntityStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
