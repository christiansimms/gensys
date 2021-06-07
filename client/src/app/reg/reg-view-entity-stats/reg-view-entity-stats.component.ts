import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {EChartsOption} from 'echarts';
import {Counter} from '../../stats';
import {TextFeatureService} from '../../text-feature.service';

@Component({
  selector: 'app-reg-view-entity-stats',
  templateUrl: './reg-view-entity-stats.component.html',
  styleUrls: ['./reg-view-entity-stats.component.scss']
})
export class RegViewEntityStatsComponent implements OnInit {

  dataOb: Observable<any>;

  chartOptions: EChartsOption[];

  features: any;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private textFeatureService: TextFeatureService,
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
          // Experiment:
          this.features = this.textFeatureService.computeFeaturesOnTable(table);
          this.chartOptions = [];

          // Loop through each column.
          const firstRow = table[0];
          firstRow.forEach((col, colIndex) => {

            const counter = new Counter();
            table.slice(1).forEach(row => {
              const colValue = row[colIndex];
              counter.addToCount(colValue);
            });
            const sortedCounts = counter.sortedCounts();
            console.log('DONE:', sortedCounts);
            const cats = sortedCounts.map(entry => entry[0]);
            const counts = sortedCounts.map(entry => entry[1]);

            const chartOption: EChartsOption = <any>{
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
            this.chartOptions.push(chartOption);
          });

        }
      });
    });
  }
}
