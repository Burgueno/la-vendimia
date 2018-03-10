/*
 *
 * Sales reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  ventas: [
    {
      folio: 1234,
      clave: 1312,
      nombre: 'Jose Urquidez',
      total: 4160.84,
      fecha: 'Mon Mar 5 2018 05:17:48 GMT-0700 (MST)',
    },
    {
      folio: 1465,
      clave: 1332,
      nombre: 'Roberto Urquidez',
      total: 5160.84,
      fecha: 'Mon Mar 5 2018 05:17:48 GMT-0700 (MST)',
    },
  ],
});

function salesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default salesReducer;
