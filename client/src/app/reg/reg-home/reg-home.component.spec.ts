import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegHomeComponent } from './reg-home.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgZone} from '@angular/core';

xdescribe('RegHomeComponent', () => {
  let component: RegHomeComponent;
  let fixture: ComponentFixture<RegHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegHomeComponent ],
      providers: [BsModalService, NgZone],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
