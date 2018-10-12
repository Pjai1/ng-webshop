import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { CreateBasket } from 'src/app/shared/selectors/basket.selector';
import { Query, Basket } from 'src/graphql-types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket: Basket;
  modalClicked = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<Query>({
        query: gql`
        {
          basket(checkoutID: "${environment.basketKey}"){
            items {
              quantity
              product {id title price}
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.basket = CreateBasket(result.data.basket);
      });
  }

  onOpen(): void {
    this.modalClicked = !this.modalClicked;
  }

  onClear(): void {}
}
