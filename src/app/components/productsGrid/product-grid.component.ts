import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllProductsQuery } from 'src/app/shared/graphql/queries/all-products.graphql';
import { ProductConnection } from 'src/graphql-types';

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
