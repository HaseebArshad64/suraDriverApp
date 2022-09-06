import {AppDispatch} from '../store';
import {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL} from '../types';

export const addToCart = (product) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: ADD_TO_CART, payload: product});
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (product) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: REMOVE_FROM_CART, payload: product});
    } catch (error) {
      console.log(error);
    }
  };
};

export const emptyCart = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: REMOVE_ALL});
    } catch (error) {
      console.log(error);
    }
  };
};
