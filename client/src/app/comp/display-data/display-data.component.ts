import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {

  @Input()
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
