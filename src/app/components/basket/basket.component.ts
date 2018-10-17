import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { CreateBasket, IBasket, ClearBasket } from 'src/app/shared/selectors/basket.selector';
import { Query } from 'src/graphql-types';
import { ClearBasketMutation } from 'src/app/shared/graphql/mutations/clear-basket.graphql';
import { GetBasketQuery } from 'src/app/shared/graphql/queries/basket.graphql';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basket: IBasket;
  modalClicked = false;

  constructor(
    private getBasketQuery: GetBasketQuery,
    private clearBasketMutation: ClearBasketMutation,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    const defaultBasket: any = { data: { basket: { items: [] } } };
    this.basket$ = this.getBasketQuery.watch().valueChanges.pipe(
      startWith(defaultBasket),
      map((result) => CreateBasket(result.data.basket)),
    );
  }

  onOpen(): void {
    this.modalClicked = !this.modalClicked;
  }

  onClear(): void {
    this.basket$ = this.clearBasketMutation
      .mutate({
        key: environment.basketKey,
      })
      .pipe(map((result) => ClearBasket()));
  }

  onProductAdded(basket: IBasket): void {
    this.basket = CreateBasket(basket);
  }
}
