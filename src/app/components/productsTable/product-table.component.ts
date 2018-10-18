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
import { ProductConnection } from 'src/graphql-types';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products$: Observable<ProductConnection>;

  constructor(private allProductsQuery: AllProductsQuery, private deleteProductMutation: DeleteProductMutation) {}

  ngOnInit(): void {
    this.products$ = this.allProductsQuery.execute();
  }

  deleteProduct(product: any): void {
    this.deleteProductMutation.execute(product.id).subscribe((result) => console.log('Deleted Product ', result));
  }

  onSorted(event: SortEvent): void {
    this.products$ = this.allProductsQuery.execute(event.sortExpression);
  }
}
