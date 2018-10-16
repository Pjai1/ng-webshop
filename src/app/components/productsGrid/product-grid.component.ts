import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit, OnDestroy {
  products: fromProduct.IProductItemDto[];
  products$: Observable<fromProduct.IProductItemDto[]>;
  subscription?: Subscription;

  constructor(private store: Store<fromProduct.IState>) {
    this.products$ = store.pipe(select(fromProductRoot.getProductsEntitiesState));
  }

  ngOnInit(): void {
    this.subscription = this.products$
      .pipe<fromProduct.IProductItemDto[]>(select(fromProductRoot.getProductsEntitiesState))
      .subscribe((products) => {
        console.log(products);
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
