import {REMOVE_FROM_CART, ADD_TO_CART, REMOVE_ALL} from '../types';
import {AnyAction} from 'redux';
import _ from 'lodash';

const INITIAL_STATE = {
  cart: [],
};

interface State {
  cart: any;
}

export default (state = INITIAL_STATE, action: AnyAction): State => {
  switch (action.type) {
    case ADD_TO_CART:
      let cart = state.cart;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === action.payload.productId) {
          cart.splice(i, 1);
        }
      }
      const check = _.indexOf(cart, action.payload);
      if (check !== -1) {
        cart.splice(check, 1);
        cart.push(action.payload);
      } else {
        cart.push(action.payload);
      }
      return {...state, cart};
    case REMOVE_FROM_CART:
      let cartOld = state.cart;
      for (let i = 0; i < cartOld.length; i++) {
        if (cartOld[i].productId === action.payload) {
          cartOld.splice(i, 1);
        }
      }
      return {...state, cart: cartOld};
    case REMOVE_ALL:
      return {cart: []};
    default:
      return {cart: []};
  }
};
