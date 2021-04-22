import {Counter} from '../stats';
import {isDate, isNumber} from '../utils';

export interface ColumnDef {
  name: string;
  type: string;
  required: boolean;
}

export function guessTable(table: any[][]): ColumnDef[] {
  const columns: ColumnDef[] = [];

  // Loop through each column.
  const firstRow = table[0];
  firstRow.forEach((col, colIndex) => {
    const name = col;

    let numCount = 0;
    let dateCount = 0;
    let unknownCount = 0;
    let emptyCount = 0;

    table.slice(1).forEach(row => {
      const val = row[colIndex];
      if (val) {
        if (isNumber(val)) {
          numCount += 1;
        } else if (isDate(val)) {
          dateCount += 1;
        } else {
          unknownCount += 1;
        }
      } else {
        emptyCount += 1;
      }
    });

    let type;
    if (numCount > dateCount) {
      type = 'number';
    } else if (dateCount > 0) {
      type = 'timestamp';
    } else {
      type = 'text';
    }

    const required = (emptyCount === 0);

    const columnDef: ColumnDef = {
      name,
      type,
      required,
    };
    columns.push(columnDef);
  });
  return columns;
}
