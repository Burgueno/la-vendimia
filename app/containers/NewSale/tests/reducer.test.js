
import { fromJS } from 'immutable';
import newSaleReducer from '../reducer';

describe('newSaleReducer', () => {
  it('returns the initial state', () => {
    expect(newSaleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
