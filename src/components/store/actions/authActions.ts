import {userDetailsProps} from '@src/components/screens/Login/Login';
import {AppDispatch} from '../store';
import {CATEGORY, LOGIN_SUCCESS, LOGOUT_SUCCESS, PRODUCTS} from '../types';

export const startPhoneLogin = (user: userDetailsProps) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: LOGIN_SUCCESS, payload: user});
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: LOGOUT_SUCCESS});
    } catch (error) {
      console.log(error);
    }
  };
};

export const setRestaurantCategory = (category) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: CATEGORY, payload: category});
    } catch (error) {
      console.log(error);
    }
  };
};

export const setRestaurantProducts = (products) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({type: PRODUCTS, payload: products});
    } catch (error) {
      console.log(error);
    }
  };
};
