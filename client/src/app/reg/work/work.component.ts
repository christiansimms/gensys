import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {smartSplit} from '../../utils';
import {TextprocService} from '../../textproc.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  procs = [];
  outputs;

  dataOb: Observable<any>;
  initialData: any;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    public textprocService: TextprocService,
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      console.log('FRAG', fragment);
      const id = smartSplit(fragment, '-')[1];
      this.dataOb = this.http.get<any>(`/api/data/entity/${id}`);
      this.dataOb.subscribe(data => {
        console.log('Data received', data);
        this.initialData = data;
      });
    });
  }

  applyProc(procName: string): void {
    this.procs.push(procName);
    this.runAllSteps();
  }

  runAllSteps(): void {
    const input = this.initialData;
    this.outputs = this.textprocService.runProcs(input, this.procs);
  }
}
