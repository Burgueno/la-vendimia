/*
 *
 * NewSale reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_PRODUCT_ACTION,
  REMOVE_PRODUCT_ACTION,
  CHANGE_PRODUCT_QUANTITY_ACTION,
  SET_PAYMENT_ACTION,
  RESET_ACTION,
} from './constants';

const initialState = fromJS({
  clientes: [
    {
      clientId: '0001',
      nombre: 'Jose Martinez Perez',
      rfc: 'MAPEJ691209',
    },
    {
      clientId: '0002',
      nombre: 'Pablo Martinez Perez',
      rfc: 'MAPEP691209',
    },
    {
      clientId: '0003',
      nombre: 'Roberto Martinez Perez',
      rfc: 'MAPER691209',
    },
  ],
  articulos: [
    {
      descripcion: 'Sala 3 Piezas',
      modelo: 'Conqueror',
      existencia: 5,
      precio: 2000.00,
    },
    {
      descripcion: 'Comedor 6 Sillas',
      modelo: 'Carlos V',
      existencia: 5,
      precio: 2520.00,
    },
    {
      descripcion: 'Comedor 4 Sillas',
      modelo: 'Julio Cesar',
      existencia: 5,
      precio: 2200.00,
    },
  ],
  configuracion: {
    tasa: 2.8,
    plazoMaximo: 12,
    porcentajeEnganche: 20,
  },
  plazos: [3, 6, 9, 12],
  period: 0,
  products: [],
});

function newSaleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_PRODUCT_ACTION: {
      const { descripcion, modelo, precio } = action;
      const producto = {
        description: descripcion,
        model: modelo,
        quantity: 1,
        price: precio,
        amount: precio,
      };
      const productos = state.get('products');
      const updatedProductos = productos.push(fromJS(producto));
      return state.set('products', List.of(...updatedProductos));
    }
    case REMOVE_PRODUCT_ACTION: {
      const { index } = action;
      const productos = state.get('products');
      const updatedProductos = productos.delete(index);
      return state.set('products', List.of(...updatedProductos));
    }
    case CHANGE_PRODUCT_QUANTITY_ACTION: {
      const { index, text } = action;
      const productos = state.get('products');
      const updatedProductos = productos.update(index, (producto) => {
        const precio = producto.get('price');
        const importe = precio * text;
        return producto.merge({ quantity: text, amount: importe });
      });
      return state.set('products', List.of(...updatedProductos));
    }
    case SET_PAYMENT_ACTION:
      return state.set('period', action.value);
    case RESET_ACTION:
      return state.merge({ products: List(), period: 0 });
    default:
      return state;
  }
}

export default newSaleReducer;
