import { BasketActions, BasketTypes } from './basket.actions';

export interface BasketItem {
  id: number;
  quantity: number;
}

export interface State {
  items: BasketItem[];
  basketOpen: boolean;
}

const initialState: State = {
  items: null,
  basketOpen: false,
};

// TODO: Add some unit tests to test reducer

export function basketReducer(state: State = initialState, action: BasketActions): State {
  switch (action.type) {
    case BasketTypes.BASKET_CLICKED:
      return {
        ...state,
        basketOpen: !state.basketOpen,
      };
    case BasketTypes.GET_BASKET:
      return {
        ...state,
      };
    case BasketTypes.GET_BASKET_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case BasketTypes.SAVE_PRODUCT_TO_BASKET:
      const addedItem = state.items.find((item) => item.id === action.payload.id);
      if (addedItem) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            }
            return {
              ...item,
            };
          }),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case BasketTypes.DELETE_BASKET:
      return {
        ...state,
      };
    case BasketTypes.DELETE_BASKET_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id === -1),
      };
    case BasketTypes.DELETE_PRODUCT_FROM_BASKET:
      return {
        ...state,
      };
    case BasketTypes.DELETE_PRODUCT_FROM_BASKET_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
