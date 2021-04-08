import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reg-view-entity',
  templateUrl: './reg-view-entity.component.html',
  styleUrls: ['./reg-view-entity.component.scss']
})
export class RegViewEntityComponent implements OnInit {

  dataOb: Observable<any>;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.dataOb = this.http.get<any[]>(`/api/data/entity/${id}`);
    });
  }
}
