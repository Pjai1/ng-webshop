import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { GetProductsAction } from 'src/app/store/product/product.actions';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit, OnDestroy {
  products: Product[];
  products$: Observable<Product[]>;
  subscription?: Subscription;

  constructor(private store: Store<fromProduct.State>) {
    this.products$ = store.pipe(select(fromProductRoot.getProductsEntitiesState));
  }

  ngOnInit(): void {
    this.subscription = this.products$
      .pipe<Product[]>(select(fromProductRoot.getProductsEntitiesState))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
