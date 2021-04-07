import {ComponentFixture, TestBed} from "@angular/core/testing";
import {fixedSizeRegexFromStr} from "./utils";
import {delimFieldStrategyApply} from "./fieldproc";

describe('fieldproc', () => {

  describe('delimFieldStrategyApply', () => {
    it('should handle brackets', () => {
      const brackets = {beginStr: '<', endStr: '>'};
      expect(delimFieldStrategyApply('<a>', brackets)).toEqual('a');
      expect(delimFieldStrategyApply('<abc>', brackets)).toEqual('abc');
      expect(delimFieldStrategyApply(' <abc> ', brackets)).toEqual('abc');
    });
    it('should handle brackets', () => {
      const empties = {beginStr: '', endStr: ''};
      expect(delimFieldStrategyApply('a', empties)).toEqual('a');
      expect(delimFieldStrategyApply('abc', empties)).toEqual('abc');
      expect(delimFieldStrategyApply('ab', {beginStr: 'a', endStr: ''})).toEqual('b');
    });
  });
});
