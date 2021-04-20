import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {EChartsOption} from 'echarts';
import {Counter} from '../../stats';

@Component({
  selector: 'app-reg-view-entity-stats',
  templateUrl: './reg-view-entity-stats.component.html',
  styleUrls: ['./reg-view-entity-stats.component.scss']
})
export class RegViewEntityStatsComponent implements OnInit {

  dataOb: Observable<any>;

  chartOption: EChartsOption;
  // chartOption: EChartsOption = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [{
  //     data: [120, 200, 150, 80, 70, 110, 130],
  //     type: 'bar',
  //     showBackground: true,
  //     backgroundStyle: {
  //       color: 'rgba(180, 180, 180, 0.2)'
  //     }
  //   }]
  // };

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.dataOb = this.http.get<any>(`/api/data/entity/${id}?includeChildren=true&includeParent=true`);
      this.dataOb.subscribe(entity => {
        console.log('Subscriber got an entity:', entity);
        if (entity.fields && entity.fields._type === 'jsonTable') {
          // It's a table.
          const table: any[][] = entity.fields.table;

          // Start w/just 1 column.
          const counter = new Counter();
          table.slice(1).forEach(row => {
            row.forEach(col => {
              counter.addToCount(col);
            });
          });
          const sortedCounts = counter.sortedCounts();
          console.log('DONE:', sortedCounts);
          const cats = sortedCounts.map(entry => entry[0]);
          const counts = sortedCounts.map(entry => entry[1]);

          this.chartOption = <any>{
            xAxis: {
              type: 'category',
              data: cats,
              axisLabel: {
                inside: true,
                textStyle: {
                  color: '#fff'
                }
              },
            },
            yAxis: {
              type: 'value'
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            series: [{
              data: counts,
              type: 'bar',
              label: {
                show: false,  // uncomment to see them, but they take up too much space
                position: 'insideBottom',
                distance: 15,
                align: 'left',
                verticalAlign: 'middle',
                rotate: 90,
                formatter: '{b}',
                fontSize: 14,
                rich: {
                  name: {}
                }
              },
            }]
          };
        }
      });
    });
  }
}
