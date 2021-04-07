import {ComponentFixture, TestBed} from "@angular/core/testing";
import {fixedSizeRegexFromStr} from "./utils";

describe('utils', () => {

  it('should fixedSizeRegexFromStr', () => {
    expect(fixedSizeRegexFromStr('a')).toEqual('[a-zA-Z]');
    expect(fixedSizeRegexFromStr('aa')).toEqual('[a-zA-Z]{2}');
    expect(fixedSizeRegexFromStr('1')).toEqual('\\d');
    expect(fixedSizeRegexFromStr('12:34')).toEqual('\\d{2}:\\d{2}');
  });
});
