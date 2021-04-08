import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FlashService} from "../flash.service";

@Component({
  selector: 'app-reg-add-child-entity',
  templateUrl: './reg-add-child-entity.component.html',
  styleUrls: ['./reg-add-child-entity.component.scss']
})
export class RegAddChildEntityComponent implements OnInit {

  dataOb: Observable<any>;
  dataId;
  obj = {
    parent_id: '',
    name: '',
    type: '',
  };

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private flashService: FlashService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.dataId = id;
      this.obj.parent_id = id;
      this.dataOb = this.http.get<any[]>(`/api/data/entity/${id}`);
    });
  }

  addEntity(obj): void {
    this.http.post('/api/data/entity', obj).subscribe(val => {
      console.log('GOT RESULT', val);
      this.flashService.tellSuccess('Entity saved', `/reg/entity/${this.dataId}`);
    });
  }
}
