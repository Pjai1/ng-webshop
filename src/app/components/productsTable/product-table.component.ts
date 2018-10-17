import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DeleteProductAction, GetProductsAction } from '@app/store/product/product.actions';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit, OnDestroy {
  products: fromProduct.IProductItemDto[];
  products$: Observable<fromProduct.IProductItemDto[]>;
  subscription: Subscription;

  constructor(private store: Store<fromProduct.IState>) {
    this.products$ = store.pipe(select(fromProductRoot.getProductsEntitiesState));
  }

  ngOnInit(): void {
    this.subscription = this.products$
      .pipe<fromProduct.IProductItemDto[]>(select(fromProductRoot.getProductsEntitiesState))
      .subscribe((products) => {
        this.products = products;
      });
  }

  deleteProduct(product: fromProduct.IProductItemDto): void {
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
