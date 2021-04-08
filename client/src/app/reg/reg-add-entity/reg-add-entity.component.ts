import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlashService} from "../flash.service";

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
    private flashService: FlashService,
  ) { }

  ngOnInit(): void {
  }

  addEntity(obj): void {
    this.http.post('/api/data/entity', obj).subscribe(val => {
      console.log('GOT RESULT', val);
      this.flashService.tellSuccess('Entity saved', '/reg/home');
    });
  }
}
