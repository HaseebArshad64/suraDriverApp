import {CATEGORY, LOGIN_SUCCESS, LOGOUT_SUCCESS, PRODUCTS} from '../types';
import {AnyAction} from 'redux';

const INITIAL_STATE = {
  currentUser: null,
  category: null,
  products: null,
};

interface State {
  currentUser: any;
  category: any;
  products: any;
}

export default (state: State = INITIAL_STATE, action: AnyAction): State => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, currentUser: action.payload};
    case CATEGORY:
      return {...state, category: action.payload};
    case PRODUCTS:
      return {...state, products: action.payload};
    case LOGOUT_SUCCESS:
      return {currentUser: null, category: null, products: null};
    default:
      return state;
  }
};
