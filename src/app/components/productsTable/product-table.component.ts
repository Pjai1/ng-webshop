import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DeleteProductAction, GetProductsAction } from 'src/app/store/product/product.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit, OnDestroy {
  products: Product[];
  products$: Observable<Product[]>;
  subscription: Subscription;

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

  deleteProduct(product: Product): void {
    this.store.dispatch(new DeleteProductAction(product));
  }

  onSorted(event: SortEvent): void {
    this.store.dispatch(new GetProductsAction(event.sortExpression));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
