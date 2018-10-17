import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateProducts, IProduct } from '../../shared/selectors/product.selector';
import { AllProductsQuery } from 'src/app/shared/graphql/queries/all-products.graphql';
import { map } from 'rxjs/operators';
import { Query, ProductConnection } from 'src/graphql-types';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products$: Observable<ProductConnection>;

  constructor(private allProductsQuery: AllProductsQuery) {}

  ngOnInit(): void {
    this.products$ = this.allProductsQuery.execute();
  }
}
