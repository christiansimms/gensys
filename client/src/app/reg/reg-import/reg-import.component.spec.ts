import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgZone} from '@angular/core';

import { RegImportComponent } from './reg-import.component';

xdescribe('RegImportComponent', () => {
  let component: RegImportComponent;
  let fixture: ComponentFixture<RegImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegImportComponent ],
      providers: [BsModalService, NgZone],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
