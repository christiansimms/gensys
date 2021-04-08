import { Component, OnInit } from '@angular/core';
import {FlashService} from "../flash.service";

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  // Make public for html template.
  constructor(public flashService: FlashService) {
  }

  ngOnInit(): void {
  }

}
