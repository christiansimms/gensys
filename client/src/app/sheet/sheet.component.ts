import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import * as jexcel from 'jexcel';
import jspreadsheet from 'jspreadsheet-ce';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit, AfterViewInit {

  @ViewChild('spreadsheet') spreadsheet: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    jspreadsheet(this.spreadsheet.nativeElement, {
      data: [[]],
      // columns: [
      //   { type: "dropdown", width: "100px", source: ["Y", "N"] },
      //   { type: "color", width: "100px", render: "square" }
      // ],
      minDimensions: [10, 10]
    });
  }

}
