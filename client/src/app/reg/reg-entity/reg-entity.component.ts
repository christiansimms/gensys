import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FlashService} from "../flash.service";

@Component({
  selector: 'app-reg-entity',
  templateUrl: './reg-entity.component.html',
  styleUrls: ['./reg-entity.component.scss']
})
export class RegEntityComponent implements OnInit {

  dataOb: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private flashService: FlashService,
  ) { }

  ngOnInit(): void {
    this.dataOb = this.http.get<any[]>('/api/data/entity?_select=id,parent_id,name,type');
  }

  deleteEntity(row: any): void {
    if (confirm('Are you sure?')) {
      const objType = row._type;
      const objId = row.id;
      if (! objType || ! objId) {
        alert('Missing row _type or id');
      }
      this.http.delete('/api/data/' + objType + '/' + objId, row).subscribe(val => {
        this.flashService.tellSuccess('Entity deleted');
      });
    }
  }
}
