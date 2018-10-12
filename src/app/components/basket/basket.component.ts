import { Component, OnInit, OnDestroy } from '@angular/core';
import { Basket } from '../../shared/models/basket.model';
import { ServiceBus } from '../../serviceBus';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromBasket from '../../store/basket/basket.reducers';
import * as fromBasketRoot from '../../store/basket/index';
import {
  DeleteBasketAction,
  DeleteProductFromBasketAction,
  BasketClickedAction,
} from 'src/app/store/basket/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  basket: Basket;
  modalClicked$: Observable<boolean>;
  modalClicked: boolean;
  subscription?: Subscription;
  basket$: Observable<Basket>;

  constructor(private serviceBus: ServiceBus, private store: Store<fromBasket.State>) {
    this.basket$ = store.pipe(select(fromBasketRoot.getBasketWithProductsState));
    this.modalClicked$ = store.pipe(select(fromBasketRoot.getBasketClickedState));
  }

  ngOnInit(): void {
    this.subscription = this.modalClicked$.subscribe((click) => (this.modalClicked = click));

    this.subscription = this.basket$.subscribe((basket) => {
      console.log('got basket', basket);
      this.basket = basket;
    });
  }

  onOpen(): void {
    this.store.dispatch(new BasketClickedAction());
  }

  onClear(): void {
    this.store.dispatch(new DeleteBasketAction());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
