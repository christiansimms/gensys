import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reg-entity',
  templateUrl: './reg-entity.component.html',
  styleUrls: ['./reg-entity.component.scss']
})
export class RegEntityComponent implements OnInit {

  dataOb: Observable<any[]>;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.dataOb = this.http.get<any[]>('/api/data/entity');
  }

}
