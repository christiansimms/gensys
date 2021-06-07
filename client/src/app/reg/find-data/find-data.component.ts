import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-find-data',
  templateUrl: './find-data.component.html',
  styleUrls: ['./find-data.component.scss']
})
export class FindDataComponent implements OnInit {
  dataOb: Observable<any>;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.dataOb = this.http.get<any[]>(`/api/data/entity/${id}?includeParent=true`);
    });
  }
}
