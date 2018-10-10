import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { GetProductsAction } from 'src/app/store/product/product.actions';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProduct.State>) {
    // no need to unsubscribe store, async pipe does this
    this.products$ = this.store.pipe(select(fromProductRoot.getProductsEntitiesState));
  }

  ngOnInit(): void {}
}
