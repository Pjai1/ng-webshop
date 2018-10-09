import { ProductActions, GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from './product.actions';
import { Product } from 'src/app/shared/models/product.model';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: null,
};

export function productsReducer(state: State = initialState, action: ProductActions): State {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };

    case GET_PRODUCTS_SUCCESS:
      console.log('heqdqdqdq');
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
