import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-json',
  templateUrl: './pre-json.component.html',
  styleUrls: ['./pre-json.component.scss']
})
export class PreJsonComponent implements OnInit {

  @Input()
  get data(): any {
    return this._data;
  }
  set data(data: any) {
    // this._data = JSON.stringify(data, undefined, 2).replace(/\\n/g, '<br/>');
    this._data = JSON.stringify(data, undefined, 2);
    console.log(this._data);
    // this._data = data;
  }
  _data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
