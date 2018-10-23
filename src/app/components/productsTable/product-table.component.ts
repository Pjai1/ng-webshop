import { Component, OnInit } from '@angular/core';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { AllProductsQuery } from 'src/app/shared/graphql/queries/all-products.graphql';
import { Observable } from 'rxjs';
import { DeleteProductMutation } from 'src/app/shared/graphql/mutations/delete-product.graphql';
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
    this.deleteProductMutation.execute(product.id).subscribe();
  }

  onSorted(event: SortEvent): void {
    this.products$ = this.allProductsQuery.execute(event.sortExpression);
  }
}
