import * as fromProduct from './product.reducers';
import * as fromActions from './product.actions';
const deepfreeze = require('deep-freeze');

describe('Product Reducer', () => {
  it('should return the default state', () => {
    const { initialState } = fromProduct;
    deepfreeze(initialState);
    const action: any = {};
    const state = fromProduct.productsReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should return the products', () => {
    const { initialState } = fromProduct;
    deepfreeze(initialState);

    const payload: fromProduct.IProductItemDto[] = [
      {
        id: 1,
        title: 'a title',
        sku: 'a sku',
        image: 'animage',
        desc: 'adesc',
        stocked: false,
        price: 1.23,
        basePrice: 1,
      },
    ];

    const changedState = fromProduct.productsReducer(initialState, {
      type: fromActions.GET_PRODUCTS_SUCCESS,
      payload,
    });
    expect(changedState.items).toBe(payload);
  });

  it('should return the product', () => {
    const { initialState } = fromProduct;
    deepfreeze(initialState);

    const payload: fromProduct.IProductItemDto = {
      id: 1,
      title: 'a title',
      sku: 'a sku',
      image: 'animage',
      desc: 'adesc',
      stocked: false,
      price: 1.23,
      basePrice: 1,
    };

    const changedState = fromProduct.productsReducer(initialState, {
      type: fromActions.GET_PRODUCT_SUCCESS,
      payload,
    });
    expect(changedState.currentProduct).toBe(payload);
  });

  it('should save the product', () => {
    const initialState: fromProduct.IState = {
      items: null,
      currentProduct: {
        id: 2,
        title: 'a title',
        sku: 'a sku',
        image: 'animage',
        desc: 'adesc',
        stocked: false,
        price: 1.23,
        basePrice: 1,
      },
    };
    deepfreeze(initialState);

    const payload: fromProduct.IProductItemDto = {
      id: 1,
      title: 'a title',
      sku: 'a sku',
      image: 'animage',
      desc: 'adesc',
      stocked: false,
      price: 1.23,
      basePrice: 1,
    };

    const changedState = fromProduct.productsReducer(initialState, {
      type: fromActions.SAVE_PRODUCT_SUCCESS,
      payload,
    });
    expect(changedState.currentProduct).toBe(payload);
  });

  it('should delete the product', () => {
    const initialState: fromProduct.IState = {
      items: [
        {
          id: 2,
          title: 'a title',
          sku: 'a sku',
          image: 'animage',
          desc: 'adesc',
          stocked: false,
          price: 1.23,
          basePrice: 1,
        },
      ],
      currentProduct: null,
    };
    deepfreeze(initialState);

    const payload: fromProduct.IProductItemDto = {
      id: 2,
      title: 'a title',
      sku: 'a sku',
      image: 'animage',
      desc: 'adesc',
      stocked: false,
      price: 1.23,
      basePrice: 1,
    };

    const changedState = fromProduct.productsReducer(initialState, {
      type: fromActions.DELETE_PRODUCT_SUCCESS,
      payload,
    });
    expect(changedState.items).toEqual([]);
  });
});
