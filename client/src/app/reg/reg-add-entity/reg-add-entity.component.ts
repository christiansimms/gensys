import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reg-add-entity',
  templateUrl: './reg-add-entity.component.html',
  styleUrls: ['./reg-add-entity.component.scss']
})
export class RegAddEntityComponent implements OnInit {

  obj = {
    name: '',
    type: '',
  };

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  addEntity(obj): void {
    this.http.post('/api/data/entity', obj).subscribe(val => {
      console.log('GOT RESULT', val);
    });
  }
}
