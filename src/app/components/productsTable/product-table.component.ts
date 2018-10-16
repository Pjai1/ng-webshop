import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { CreateProducts, IProduct } from 'src/app/shared/selectors/product.selector';
import { AllProductsQuery } from 'src/app/shared/graphql/queries/all-products.graphql';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DeleteProductMutation } from 'src/app/shared/graphql/mutations/delete-product.graphql';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: Observable<IProduct[]>;

  constructor(private allProductsQuery: AllProductsQuery, private deleteProductMutation: DeleteProductMutation) {}

  ngOnInit(): void {
    this.products = this.allProductsQuery
      .watch()
      .valueChanges.pipe(map((result) => CreateProducts(result.data.allProducts)));
  }

  deleteProduct(product: Product): void {
    this.deleteProductMutation
      .mutate({
        key: product.id,
      })
      .subscribe((result) => {
        this.products = this.products.pipe(map((products) => products.filter((item) => item.id !== product.id)));
      });
  }

  onSorted(event: SortEvent): void {}
}
