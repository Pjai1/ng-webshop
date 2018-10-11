import {
  ProductActions,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FROM_ITEMS,
  SAVE_PRODUCT_TO_ITEMS,
} from './product.actions';
import { Product } from 'src/app/shared/models/product.model';

export interface State {
  items: Product[];
  currentProduct: Product;
}

const initialState: State = {
  items: null,
  currentProduct: null,
};

export function productsReducer(state: State = initialState, action: ProductActions): State {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };

    case GET_PRODUCT:
      return {
        ...state,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
      };

    case SAVE_PRODUCT_TO_ITEMS:
      const savedItem = state.items.find((item) => item.id === action.payload.id);
      if (savedItem) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: null,
      };

    case DELETE_PRODUCT_FROM_ITEMS:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload.id),
      };
    default:
      return state;
  }
}
