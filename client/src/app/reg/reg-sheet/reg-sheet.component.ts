import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reg-sheet',
  templateUrl: './reg-sheet.component.html',
  styleUrls: ['./reg-sheet.component.scss']
})
export class RegSheetComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }
}
