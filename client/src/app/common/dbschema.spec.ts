import {fixedSizeRegexFromStr} from '../utils';
import {guessTable} from './dbschema';

describe('dbschema', () => {
  describe('guessTable', () => {
    it('should handle types correctly', () => {
      expect(guessTable([['Col1']])).toEqual([{name: 'Col1', type: 'text', required: true}]);
      expect(guessTable([['Col1'], ['1']])).toEqual([{name: 'Col1', type: 'number', required: true}]);
      expect(guessTable([['Col1'], ['1/1/2001']])).toEqual([{name: 'Col1', type: 'timestamp', required: true}]);
    });
    it('should compute required flag', () => {
      expect(guessTable([['Col1'], ['1'], ['']])).toEqual([{name: 'Col1', type: 'number', required: false}]);
    });
  });
});
