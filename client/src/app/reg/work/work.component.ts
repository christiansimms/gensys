import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {smartSplit} from '../../utils';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  dataOb: Observable<any>;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      console.log('FRAG', fragment);
      const id = smartSplit(fragment, '-')[1];
      this.dataOb = this.http.get<any>(`/api/data/entity/${id}`);
    });
  }
}
