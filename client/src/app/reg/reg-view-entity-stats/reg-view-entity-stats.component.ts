import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {EChartsOption} from 'echarts';

@Component({
  selector: 'app-reg-view-entity-stats',
  templateUrl: './reg-view-entity-stats.component.html',
  styleUrls: ['./reg-view-entity-stats.component.scss']
})
export class RegViewEntityStatsComponent implements OnInit {

  dataOb: Observable<any>;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.dataOb = this.http.get<any[]>(`/api/data/entity/${id}?includeChildren=true&includeParent=true`);
    });
  }
}
