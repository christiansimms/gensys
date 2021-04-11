// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
// crs added Number

import {last} from "rxjs/operators";

export function smartSplit(val: string, delim: string): Array<string> {
  if (!val) {
    return [];  // bummer this isn't the default split() behavior
  } else {
    // Return list, filtering out empty strings.
    return val.split(delim).filter(item => item.length > 0);
  }
}

export function dumbSplit(val: string, delim: string): Array<string> {
  if (!val) {
    return [];  // bummer this isn't the default split() behavior
  } else {
    // Return list, but *do not* filter out empty strings -- spreadsheets need them!
    return val.split(delim);
  }
}


const _hasOwn = {}.hasOwnProperty;

export function hasOwn(obj, prop): boolean {
  return _hasOwn.call(obj, prop);
}

const _global = window;
export const concat = [].concat;

function flatten(a: any[]): any {
  return concat.apply([], a);
}

export let intrinsicTypes =
  'Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set,Number'
    .split(',').concat(
    flatten([8, 16, 32, 64].map(num => ['Int', 'Uint', 'Float'].map(t => t + num + 'Array')))
  ).filter(t => _global[t]).map(t => _global[t]);

// Modify json structure.
export function deepApply(val, fn): any {
  if (typeof val === 'string') {
    return fn(val);
  }

  if (!val || typeof val !== 'object') {
    return val;
  }

  if (Array.isArray(val)) {
    const out = [];
    for (let i = 0, l = val.length; i < l; ++i) {
      out.push(deepApply(val[i], fn));
    }
    return out;
  } else if (intrinsicTypes.indexOf(val.constructor) >= 0) {
    // Simple type, but not string.
    return val;
  } else {
    const out = {};
    for (const prop in val) {
      if (hasOwn(val, prop)) {
        out[prop] = deepApply(val[prop], fn);
      }
    }
    return out;
  }
}

// Snagged from: https://stackoverflow.com/questions/1773550/convert-xml-to-json-and-back-using-javascript
export function xml2json(xml: any, {ignoreTags = []} = {}): any {
  const el = xml.nodeType === 9 ? xml.documentElement : xml;
  if (ignoreTags.includes(el.nodeName)) {
    return el;
  }

  const h: any = {_name: el.nodeName};
  h.content = Array.from(el.childNodes || []).filter((n: any) => n.nodeType === 3).map((n: any) => n.textContent.trim()).join('');
  h.attributes = Array.from(el.attributes || []).filter(a => a).reduce((hAccumulator, a: any) => {
    hAccumulator[a.name] = a.value;
    return hAccumulator;
  }, {});
  h.children = Array.from(el.childNodes || []).filter((n: any) => n.nodeType === 1).map((c: any) => {
    const r = xml2json(c, {ignoreTags});
    // h[c.nodeName] = h[c.nodeName] || r;  // crs took this out -- why was it here?
    return r;
  });
  return h;
}

export function range(start: number, end: number): number[] {
  return new Array(end - start + 1).fill(undefined).map((el, ind) => ind + start);
}

// export function isStringNumber(value): boolean {
//   return !isNaN(Number(value));
// }

function isLetter(c: string): boolean {
  return c.toLowerCase() !== c.toUpperCase();
}

function isNumber(c: string): boolean {
  return !isNaN(Number(c));
}

function getCharCat(letter: string): string {
  if (isLetter(letter)) {
    return 'alpha';
  } else if (isNumber(letter)) {
    return 'num';
  } else if (letter === ' ') {
    return 'space';
  } else {
    return letter;  // 'other';
  }
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(val): string {
  return val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


function regexForCat(cat: string): string {
  switch (cat) {
    case 'alpha':
      return '[a-zA-Z]';
    case 'num':
      return '\\d';
    case 'space':
      return '\\s';
    default:
      return escapeRegExp(cat);
  }
}

function regexChunk(lastCat: string, catCount: number): string {
  if (catCount === 1) {
    return regexForCat(lastCat);
  } else {
    return regexForCat(lastCat) + '{' + catCount + '}';
  }
}

export function fixedSizeRegexFromStr(val: string): string {
  const out = [];
  let lastCat;
  let catCount = 0;
  // for (const char of val) {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < val.length; i++) {
    const char = val[i];
    const cat = getCharCat(char);
    if (cat === lastCat) {
      // Keep going.
      ++catCount;
    } else {
      // They are different.
      // Roll up previous.
      if (catCount > 0) {
        out.push(regexChunk(lastCat, catCount));
      }
      catCount = 1;
    }
    lastCat = cat;
  }
  // Finish up.
  if (catCount > 0) {
    out.push(regexChunk(lastCat, catCount));
    catCount = 0;
  }
  return out.join('');
}

// Snagged from: https://stackoverflow.com/questions/19485353/function-to-convert-timestamp-to-human-date-in-javascript/19485922
export function unixTimeFormat(includeMillis: boolean = false): string {

  const u = new Date();

  return u.getUTCFullYear() +
    '-' + ('0' + u.getUTCMonth()).slice(-2) +
    '-' + ('0' + u.getUTCDate()).slice(-2) +
    ' ' + ('0' + u.getUTCHours()).slice(-2) +
    ':' + ('0' + u.getUTCMinutes()).slice(-2) +
    ':' + ('0' + u.getUTCSeconds()).slice(-2) +
    (includeMillis ? ('.' + (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)) : '');
}
