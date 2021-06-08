import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-data-as-html-table',
  templateUrl: './display-data-as-html-table.component.html',
  styleUrls: ['./display-data-as-html-table.component.scss']
})
export class DisplayDataAsHtmlTableComponent implements OnInit {

  @Input()
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
