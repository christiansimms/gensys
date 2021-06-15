import {Component, Input, OnInit} from '@angular/core';
import {Grid} from '../../agent.service';

@Component({
  selector: 'app-display-data-as-html-table',
  templateUrl: './display-data-as-html-table.component.html',
  styleUrls: ['./display-data-as-html-table.component.scss']
})
export class DisplayDataAsHtmlTableComponent implements OnInit {

  @Input()
  dataTable: Grid;

  constructor() { }

  ngOnInit(): void {
  }

}
