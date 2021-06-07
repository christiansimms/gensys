import {Injectable} from '@angular/core';
import {CharCategory, getCharCatLimited} from './utils';


@Injectable({
  providedIn: 'root'
})
export class TextFeatureService {

  constructor() { }

  computeFeatures(val: string): any {
    const count = val.length;
    let alpha = 0;
    let num = 0;
    let space = 0;
    let other = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < val.length; i++) {
      const char = val[i];
      const cat = getCharCatLimited(char);
      switch (cat) {
        case CharCategory.alpha:
          alpha++;
          break;
        case CharCategory.num:
          num++;
          break;
        case CharCategory.space:
          space++;
          break;
        case CharCategory.other:
          other++;
          break;
      }
    }
    return {
      alpha: alpha / count,
      num: num / count,
      space: space / count,
      other: other / count,
    };
  }

  computeFeaturesOnTable(table: any[][]): any {
    return table.map(row => {
      return row.map(col => {
        return this.computeFeatures(col);
      });
    });
  }
}
