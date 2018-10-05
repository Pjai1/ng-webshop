import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Product } from '../models/product.model';

describe('Product Service', () => {
  let service: ProductService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    service = new ProductService(<any>httpClientSpy);
  });

  it('should return products', async(() => {
    const expectedProducts: any = {
      selectedProducts: [
        {
          id: 123,
          sku: '4789',
          stocked: true,
          desc: 'Our best product!',
          title: 'Truly the best lawn-mower',
          price: 12.9,
          basePrice: 10,
          image: 'https://bestimageever.png',
        },
      ],
    };

    httpClientSpy.get.mockReturnValue(of(expectedProducts));

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(expectedProducts.selectedProducts);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    service
      .getProducts()
      .subscribe(
        (products) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });

  it('should return a product', async(() => {
    const expectedProduct: any = {
      id: 123,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.get.mockReturnValue(of(expectedProduct));

    service.getProduct(expectedProduct.id).subscribe((product) => {
      expect(product).toEqual(expectedProduct);
    });
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    service
      .getProduct(1)
      .subscribe((product) => fail('expected an error, not products'), (error) => expect(error).toEqual(errorResponse));
  });

  it('should create a product', async(() => {
    const product: any = {
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.post.mockReturnValue(of(product));

    service.createProduct(product).subscribe((createdProduct) => {
      expect(createdProduct).toEqual(product);
    });
    expect(httpClientSpy.post.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const product: any = {
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.post.mockReturnValue(throwError(errorResponse));

    service
      .createProduct(product)
      .subscribe(
        (resource) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });

  it('should change a product', async(() => {
    const product: any = {
      id: 2,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.put.mockReturnValue(of(product));

    service.updateProduct(product).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(product);
    });
    expect(httpClientSpy.put.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const product: any = {
      id: 2,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.put.mockReturnValue(throwError(errorResponse));

    service
      .updateProduct(product)
      .subscribe(
        (resource) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });

  it('should delete a product', async(() => {
    const product: any = {
      id: 2,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.delete.mockReturnValue(of(product));

    service.deleteProduct(product).subscribe((deletedProduct) => {
      expect(deletedProduct).toEqual(product);
    });
    expect(httpClientSpy.delete.mock.calls.length).toBe(1);
  }));

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const product: any = {
      id: 2,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
    };

    httpClientSpy.delete.mockReturnValue(throwError(errorResponse));

    service
      .deleteProduct(product)
      .subscribe(
        (resource) => fail('expected an error, not products'),
        (error) => expect(error).toEqual(errorResponse),
      );
  });

  it('should create a product when no id is given', async(() => {
    const product: any = {
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
      isNew() {
        return !this.id;
      },
    };

    httpClientSpy.post.mockReturnValue(of(product));

    service.saveProduct(product).subscribe((createdProduct) => {
      expect(createdProduct).toEqual(product);
    });
    expect(httpClientSpy.post.mock.calls.length).toBe(1);
  }));

  it('should save a product when an id is given', async(() => {
    const product: any = {
      id: 2,
      sku: '4789',
      stocked: true,
      desc: 'Our best product!',
      title: 'Truly the best lawn-mower',
      price: 12.9,
      basePrice: 10,
      image: 'https://bestimageever.png',
      isNew() {
        return !this.id;
      },
    };

    httpClientSpy.put.mockReturnValue(of(product));

    service.saveProduct(product).subscribe((savedProduct) => {
      expect(savedProduct).toEqual(product);
    });
    expect(httpClientSpy.put.mock.calls.length).toBe(1);
  }));
});
