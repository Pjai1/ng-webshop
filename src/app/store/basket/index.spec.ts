import { getBasketClickedState, getBasketEntitiesState, getBasketWithProductsState } from '.';

describe('Basket Selector', () => {
  let state: any;

  beforeEach(() => {
    state = {
      products: {
        items: [
          {
            id: 2,
            title: 'a title',
            price: 80,
            basePrice: 100,
          },
        ],
      },
      router: {
        state: {
          root: {
            firstChild: {
              params: {
                id: 2,
              },
            },
          },
        },
      },
      basket: {
        items: [
          {
            id: 1,
            quantity: 2,
          },
        ],
        basketOpen: false,
      },
    };
  });

  it('should return the clicked state', () => {
    const resultState: any = getBasketClickedState(state);

    expect(resultState).toBe(false);
  });

  it('should return the basket', () => {
    const resultState: any = getBasketEntitiesState(state);

    expect(resultState).toEqual(state.basket.items);
  });

  it('should return the basket with products', () => {
    const resultState: any = getBasketWithProductsState(state);

    expect(resultState.basketItems.length).toEqual(state.basket.items.length);
  });
});
