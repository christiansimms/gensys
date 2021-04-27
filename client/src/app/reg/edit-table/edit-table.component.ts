import { Component, OnInit } from '@angular/core';
import {smartSplit} from '../../utils';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FlashService} from '../flash.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  initialData: any;
  unsavedChanges = false;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private flashService: FlashService,
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

  onSave(): void {
    this.http.post(`/api/data/entity/${this.initialData.id}`, this.initialData).subscribe(_ => {
      this.flashService.tellSuccessImmediately('File saved');
    });
  }

  onUnsavedChanges(unsavedChanges: boolean): void {
    this.unsavedChanges = unsavedChanges;
  }
}
