import {fixedSizeRegexFromStr} from "./utils";

function locationFieldStrategy(fullText: string, selectedText: string): any {
  const startPos = fullText.indexOf(selectedText);
  return {beginPos: startPos, length: selectedText.length};
}

function delimFieldStrategy(fullText: string, selectedText: string): any {
  const startPos = fullText.indexOf(selectedText);
  let beginStr = '';
  let endStr = '';
  if (startPos > 0) {
    beginStr = fullText.substr(startPos - 1, 1);
  }
  if ((startPos + selectedText.length) < fullText.length) {
    endStr = fullText.substr(startPos + selectedText.length, 1);
  }
  return {beginStr, endStr};
}

function regexFieldStrategy(fullText: string, selectedText: string): any {
  return {regex: fixedSizeRegexFromStr(selectedText)};
}

function locationFieldStrategyApply(fullText: string, params: any): string {
  return fullText.substr(params.beginPos, params.length);
}

export function delimFieldStrategyApply(fullText: string, params: any): string {
  const startPos = fullText.indexOf(params.beginStr);
  if (startPos > -1) {
    const partialStr = fullText.substr(startPos + params.beginStr.length);
    if (params.endStr) {
      const endPos = partialStr.indexOf(params.endStr);
      if (endPos > -1) {
        return partialStr.substr(0, endPos);
      }
    } else {
      // Assume we should grab the rest.
      return partialStr;
    }
  }
  return '';  // 'FAILED';
}

function regexFieldStrategyApply(fullText: string, params: any): string {
  const match = fullText.match(params.regex);
  if (match) {
    return match[0];
  } else {
    return '';  // 'FAILED';
  }
}

export enum FieldType {
  string = 'string',
  number = 'number',
  regex = 'regex',
}

interface Param {
  name: string;
  type: FieldType;
}

export interface FieldExtractStrategy {
  name: string;
  params: Param[];
  extractFunc: (fullText: string, selectedText: string) => any;
  applyFunc: (fullText: string, params: any) => string;
}

export interface FieldExtractChoice {
  strategy: FieldExtractStrategy;
  computedParams: {};
  computedOutput: {};
}

// Allowed field extraction strategies.
export const strategies: FieldExtractStrategy[] = [
  {
    name: 'Location',
    params: [
      {name: 'beginPos', type: FieldType.number},
      {name: 'length', type: FieldType.number}
    ],
    extractFunc: locationFieldStrategy,
    applyFunc: locationFieldStrategyApply,
  },
  {
    name: 'Begin/End Delimiters',
    params: [
      {name: 'beginStr', type: FieldType.string},
      {name: 'endStr', type: FieldType.string},
    ],
    extractFunc: delimFieldStrategy,
    applyFunc: delimFieldStrategyApply,
  },
  {
    name: 'Regex',
    params: [
      {name: 'regex', type: FieldType.regex},
    ],
    extractFunc: regexFieldStrategy,
    applyFunc: regexFieldStrategyApply,
  },
];
