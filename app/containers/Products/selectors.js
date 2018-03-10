import { createSelector } from 'reselect';

/**
 * Direct selector to the products state domain
 */
const selectProductsDomain = () => (state) => state.get('products');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Products
 */

const makeSelectProducts = () => createSelector(
  selectProductsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectProducts;
export {
  selectProductsDomain,
};
