import { Component, OnInit } from '@angular/core';
import * as fromRoot from './store/index';
import { Store } from '@ngrx/store';
import { GetProductsAction } from './store/product/product.actions';
import { GetBasketAction } from './store/basket/basket.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webshop-app';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetProductsAction());
    this.store.dispatch(new GetBasketAction());
  }
}
