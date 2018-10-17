import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { CreateProducts, IProduct } from 'src/app/shared/selectors/product.selector';
import { AllProductsQuery } from 'src/app/shared/graphql/queries/all-products.graphql';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DeleteProductMutation } from 'src/app/shared/graphql/mutations/delete-product.graphql';
import { RemoveItemFromBasketMutation } from 'src/app/shared/graphql/mutations/remove-item-from-basket';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: Observable<IProduct[]>;

  constructor(
    private allProductsQuery: AllProductsQuery,
    private deleteProductMutation: DeleteProductMutation,
    private removeItemFromBasketMutation: RemoveItemFromBasketMutation,
  ) {}

  ngOnInit(): void {
    this.products = this.allProductsQuery
      .watch()
      .valueChanges.pipe(map((result) => CreateProducts(result.data.allProducts)));
  }

  deleteProduct(product: Product): void {
    this.removeItemFromBasketMutation
      .mutate({
        checkoutID: environment.basketKey,
        key: product.id,
      })
      .subscribe((result) => {
        console.log(result);
      });

    this.deleteProductMutation
      .mutate({
        key: product.id,
      })
      .subscribe((result) => {
        this.products = this.products.pipe(map((products) => products.filter((item) => item.id !== product.id)));
      });
  }

  onSorted(event: SortEvent): void {
    this.products = this.allProductsQuery
      .watch({
        orderBy: event.sortExpression,
      })
      .valueChanges.pipe(map((result) => CreateProducts(result.data.allProducts)));
  }
}
