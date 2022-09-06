import AsyncStorage from '@react-native-community/async-storage';
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import {Dispatch} from 'react';

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: AsyncStorage,
  // blacklist: [], // Non persisted reducers here
};

const persistedReducer = persistReducer(persistConfig, Reducers);

const middlewareEnhancer = applyMiddleware(ReduxThunk);
const composedEnhancers = compose(middlewareEnhancer);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers,
);
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch | Dispatch<any>;
