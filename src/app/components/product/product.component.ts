import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '@app/store/product/product.reducers';
import { SaveProductToBasketAction, BasketClickedAction } from '@app/store/basket/basket.actions';
import { Observable } from 'rxjs';
import * as fromBasketRoot from '@app/store/basket/index';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input()
  product: fromProduct.IProductItemDto;
  quantity = 1;
  modalClicked$: Observable<boolean>;
  modalClicked: boolean;

  constructor(private store: Store<fromProduct.IState>) {
    this.modalClicked$ = store.pipe(select(fromBasketRoot.getBasketClickedState));
  }

  ngOnInit(): void {
    this.modalClicked$.subscribe((click) => (this.modalClicked = click));
  }

  onAddProduct(): void {
    this.store.dispatch(new SaveProductToBasketAction({ id: this.product.id, quantity: this.quantity }));
    if (!this.modalClicked) {
      this.store.dispatch(new BasketClickedAction());
    }
  }
}
