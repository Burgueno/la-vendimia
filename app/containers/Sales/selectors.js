import { createSelector } from 'reselect';

/**
 * Direct selector to the sales state domain
 */
const selectSalesDomain = () => (state) => state.get('sales');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sales
 */

const makeSelectSales = () => createSelector(
  selectSalesDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSales;
export {
  selectSalesDomain,
};
