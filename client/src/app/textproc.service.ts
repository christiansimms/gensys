import {Injectable} from '@angular/core';
import {concat, deepApply, dumbSplit, xml2json} from './utils';
import {guessTable} from './common/dbschema';

// Allowed commands.
const commands = {
  splitLines: (text: string) => {
    return dumbSplit(text, '\n');
  },
  splitTabs: (text: string) => {
    return dumbSplit(text, '\t');
  },
  parseJSON: (text: string) => {
    return JSON.parse(text);
  },
  parseXML: (text: string) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(text, 'application/xml');

    // This is the crazy way to detect errors
    //   https://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
    const parsererrorNS = parser.parseFromString('INVALID', 'application/xml').getElementsByTagName('parsererror')[0].namespaceURI;
    if (dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
      throw new Error('Error parsing XML');
    }

    return xml2json(dom);
  },
};

const nonRecursiveCommands = {
  displayAsTable: (val: any) => {
    return {
      _type: 'jsonTable',
      table: val,
    };
  },

  guessTable: (val: any) => {
    return guessTable(val);
  }
};

@Injectable({
  providedIn: 'root'
})
export class TextprocService {

  constructor() {
  }

  getProcs(): string[] {
    return ([] as string[]).concat(Object.keys(commands), Object.keys(nonRecursiveCommands)) ;
  }

  runProc(input: any, procName: string): any {
    try {
      if (procName in commands) {
        const proc = commands[procName];
        // return proc(input);
        return deepApply(input, proc);
      } else if (procName in nonRecursiveCommands) {
        const proc = nonRecursiveCommands[procName];
        return proc(input);
      }
    } catch (e) {
      return 'Error: ' + e.message;
    }
  }

  runProcs(input: string, procs: any[]): any {
    const out = [];
    let val = input;
    procs.forEach(proc => {
      val = this.runProc(val, proc);
      out.push(val);
    });
    return out;
  }
}
