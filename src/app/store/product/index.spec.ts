import { getProductsEntitiesState, getProductEntitiesState } from '.';
import { productsReducer } from './product.reducers';

describe('Product Selector', () => {
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
    };
  });
  it('should get products', () => {
    const resultState: any = getProductsEntitiesState(state);
    expect(typeof resultState[0].discount).toBe('number');
    expect(resultState[0].discount).toBeCloseTo(0.2);
  });

  it('should get a product', () => {
    const resultState: any = getProductEntitiesState(state);

    expect(resultState.id).toEqual(state.router.state.root.firstChild.params.id);
    expect(typeof resultState.discount).toBe('number');
    expect(resultState.discount).toBeCloseTo(0.2);
  });

  it('should have a discount of zero when the price is missing', () => {
    const newState: any = {
      products: {
        items: [
          {
            id: 2,
            title: 'a title',
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
    };
    const resultState: any = getProductEntitiesState(newState);

    expect(typeof resultState.discount).toBe('number');
    expect(resultState.discount).toBe(0);
  });
});
