import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDataAsHtmlTableComponent } from './display-data-as-html-table.component';

describe('DisplayDataAsHtmlTableComponent', () => {
  let component: DisplayDataAsHtmlTableComponent;
  let fixture: ComponentFixture<DisplayDataAsHtmlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDataAsHtmlTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDataAsHtmlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
