import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
// import * as jexcel from 'jexcel';
import jspreadsheet from 'jspreadsheet-ce';
import {cloneDeep, isEqual} from 'lodash';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit, AfterViewInit {

  @ViewChild('spreadsheet') spreadsheet: ElementRef;

  @Input() data: any;
  @Output() unsavedChanges = new EventEmitter<boolean>();

  private initialData: any;
  private sheet: jspreadsheet;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log('Input:', this.data);
    this.initialData = cloneDeep(this.data);
    this.sheet = jspreadsheet(this.spreadsheet.nativeElement, {
      data: this.data,  //  || [[]],
      // columns: [
      //   { type: "dropdown", width: "100px", source: ["Y", "N"] },
      //   { type: "color", width: "100px", render: "square" }
      // ],
      // minDimensions: [10, 10],
      columnSorting: false,
      onafterchanges: this.onafterchanges.bind(this),
      onundo: this.onafterchanges.bind(this),
      onredo: this.onafterchanges.bind(this),
      ondeletecolumn: this.onafterchanges.bind(this),
      ondeleterow: this.onafterchanges.bind(this),
      oninsertcolumn: this.onafterchanges.bind(this),
      oninsertrow: this.onafterchanges.bind(this),
      // crs: not sure about this, but there are bugs in copy/paste
      // onbeforepaste: (el, data) => {
      //   console.log('onbeforepaste', data, data.replace(/"/g, '""'));
      //   // return data.replace(/"/g, '&quot;');
      //   // return data.replace(/"/g, '\\"');
      //   return data.replace(/"/g, '""');
      // },
    });
    // const sheetData = this.sheet.getData();
    // const equal = isEqual(sheetData, this.initialData);
    // console.log('after setup:', sheetData, equal, sheetData === this.data);
  }

  onafterchanges(el, records): void {
    // Watch out, if user undos/redos, this is not called!
    const sheetData = this.sheet.getData();
    const equal = isEqual(sheetData, this.initialData);
    this.unsavedChanges.emit(!equal);
    // console.log('onafterchanges:', records, sheetData, equal);
  }

}
