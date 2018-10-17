import { cold, hot } from 'jasmine-marbles';
import * as actions from './product.actions';
import { ProductService, IProductsDto, IProductDto } from '@app/shared/services/product.service';
import { ProductEffects } from './product.effects';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

let service: any;
let store: any;
let products: IProductsDto;
let product: IProductDto;

beforeEach(() => {
  service = { getProducts: jest.fn(), getProduct: jest.fn(), saveProduct: jest.fn(), deleteProduct: jest.fn() };
  store = { dispatch: jest.fn() };
  products = {
    selectedProducts: [
      {
        id: 1,
      },
    ],
  };
  product = {
    id: 1,
  };
});

describe('Product Effects', () => {
  it('should return products', () => {
    const source = cold('a', { a: { type: actions.GET_PRODUCTS } });
    const effects = new ProductEffects(service, new Actions(source), store);

    const expected = cold('a', { a: { type: actions.GET_PRODUCTS_SUCCESS, payload: products } });

    service.getProducts.mockReturnValue(of(products));
    expect(effects.getProducts$).toBeObservable(expected);
  });

  it('should return a product', () => {
    const source = cold('a', { a: { type: actions.GET_PRODUCT } });
    const effects = new ProductEffects(service, new Actions(source), store);

    const expected = cold('a', { a: { type: actions.GET_PRODUCT_SUCCESS, payload: product } });

    service.getProduct.mockReturnValue(of(product));
    expect(effects.getProduct$).toBeObservable(expected);
  });

  it('should delete a product', () => {
    const source = cold('a', { a: { type: actions.DELETE_PRODUCT } });
    const effects = new ProductEffects(service, new Actions(source), store);

    const expected = cold('a', { a: { type: actions.DELETE_PRODUCT_SUCCESS, payload: product } });

    service.deleteProduct.mockReturnValue(of(product));
    expect(effects.deleteProduct$).toBeObservable(expected);
  });

  it('should save a product', () => {
    const source = cold('a', { a: { type: actions.SAVE_PRODUCT } });
    const effects = new ProductEffects(service, new Actions(source), store);

    const expected = cold('(ab)', {
      a: { type: actions.SAVE_PRODUCT_SUCCESS, payload: product },
      b: { type: actions.SAVE_PRODUCT_TO_ITEMS, payload: product },
    });

    service.saveProduct.mockReturnValue(of(product));
    expect(effects.saveProduct$).toBeObservable(expected);
  });
});
