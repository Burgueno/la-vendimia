/*
 *
 * NewSale actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_PRODUCT_ACTION,
  REMOVE_PRODUCT_ACTION,
  CHANGE_PRODUCT_QUANTITY_ACTION,
  SET_PAYMENT_ACTION,
  RESET_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addProductAction(descripcion, modelo, precio) {
  return {
    type: ADD_PRODUCT_ACTION,
    descripcion,
    modelo,
    precio,
  };
}

export function removeProductAction(index) {
  return {
    type: REMOVE_PRODUCT_ACTION,
    index,
  };
}

export function changeProductQuantityAction(index, text) {
  return {
    type: CHANGE_PRODUCT_QUANTITY_ACTION,
    index,
    text,
  };
}

export function setPaymentAction(value) {
  return {
    type: SET_PAYMENT_ACTION,
    value,
  };
}

export function resetAction() {
  return {
    type: RESET_ACTION,
  };
}
