import { BasketActions, BasketTypes } from './basket.actions';

export interface IBasketItemDto {
  id: number;
  quantity: number;
}

export interface IState {
  items: IBasketItemDto[];
  basketOpen: boolean;
}

export const initialState: IState = {
  items: null,
  basketOpen: false,
};

// TODO: Add some unit tests to test reducer

export function basketReducer(state: IState = initialState, action: BasketActions): IState {
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
