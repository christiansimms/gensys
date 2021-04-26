import { Component, OnInit } from '@angular/core';
import {smartSplit} from '../../utils';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  initialData: any;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      const dataOb = this.http.get<any>(`/api/data/entity/${id}`);
      dataOb.subscribe(data => {
        this.initialData = data;
      });
    });
  }

}