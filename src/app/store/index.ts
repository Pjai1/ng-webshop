import * as fromProduct from './product/product.reducers';
import * as fromMessage from './message/message.reducers';
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export interface State {
  products: fromProduct.State;
  messages: fromMessage.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProduct.productsReducer,
  messages: fromMessage.messagesReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];
