
import { fromJS } from 'immutable';
import salesReducer from '../reducer';

describe('salesReducer', () => {
  it('returns the initial state', () => {
    expect(salesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
