import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromBasket from '@app/store/basket/basket.reducers';
import * as fromBasketRoot from '@app/store/basket/index';
import { DeleteBasketAction, BasketClickedAction } from '@app/store/basket/basket.actions';
import { IBasketDto } from '@app/shared/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  basket: IBasketDto;
  modalClicked$: Observable<boolean>;
  modalClicked: boolean;
  subscription?: Subscription;
  basket$: Observable<IBasketDto>;

  constructor(private store: Store<fromBasket.IState>) {
    this.basket$ = store.pipe(select(fromBasketRoot.getBasketWithProductsState));
    this.modalClicked$ = store.pipe(select(fromBasketRoot.getBasketClickedState));
  }

  ngOnInit(): void {
    this.subscription = this.modalClicked$.subscribe((click) => (this.modalClicked = click));

    this.subscription = this.basket$.subscribe((basket) => {
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
