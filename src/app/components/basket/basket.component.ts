import { Component, OnInit } from '@angular/core';
import { ClearBasketMutation } from 'src/app/shared/graphql/mutations/clear-basket.graphql';
import { GetBasketQuery } from 'src/app/shared/graphql/queries/basket.graphql';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/graphql/resolvers.graphql';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basket: IBasket;
  modalClicked = false;

  constructor(private getBasketQuery: GetBasketQuery, private clearBasketMutation: ClearBasketMutation) {}

  ngOnInit(): void {
    this.basket$ = this.getBasketQuery.execute();
  }

  onOpen(): void {
    this.modalClicked = !this.modalClicked;
  }

  onClear(): void {
    this.clearBasketMutation.execute().subscribe();
  }
}
