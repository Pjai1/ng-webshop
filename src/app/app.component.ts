import { Component, OnInit } from '@angular/core';
import * as fromRoot from './store/index';
import { Store } from '@ngrx/store';
import { GetProductsAction } from './store/product/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webshop-app';
  openPanel = true;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetProductsAction());
  }

  toggleViews(): void {
    this.openPanel = !this.openPanel;
  }
}
