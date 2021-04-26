import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// import * as jexcel from 'jexcel';
import jspreadsheet from 'jspreadsheet-ce';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit, AfterViewInit {

  @ViewChild('spreadsheet') spreadsheet: ElementRef;

  @Input()
  data: any;
  private sheet: jspreadsheet;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('Input:', this.data);
    this.sheet = jspreadsheet(this.spreadsheet.nativeElement, {
      data: this.data,  //  || [[]],
      // columns: [
      //   { type: "dropdown", width: "100px", source: ["Y", "N"] },
      //   { type: "color", width: "100px", render: "square" }
      // ],
      // minDimensions: [10, 10],
      columnSorting: false,
      onafterchanges: this.onafterchanges.bind(this),
    });
  }

  onafterchanges(el, records): void {
    // Watch out, if user undos/redos, this is not called!
    // console.log('onafterchanges:', records, this.sheet.getData());
  }

}
