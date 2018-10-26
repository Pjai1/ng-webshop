import { Component, OnInit } from '@angular/core';
import { ClearBasketMutation } from 'src/app/shared/graphql/mutations/clear-basket.graphql';
import { GetBasketQuery } from 'src/app/shared/graphql/queries/basket.graphql';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/graphql/resolvers.graphql';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { basketFragment } from 'src/app/shared/graphql/fragments/basket-fragment.graphql';
import { environment } from 'src/environments/environment';

const query = gql`
  query basket($checkoutID: String!) {
    basket(checkoutID: $checkoutID) {
      ...basketFields
      totalPrice @client
    }
  }
  ${basketFragment}
`;

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
    this.basket$ = this.getBasketQuery.execute();
  }

  onOpen(): void {
    this.modalClicked = !this.modalClicked;
  }

  onClear(): void {
    this.clearBasketMutation.execute().subscribe((result) => {
      const data: any = this.apollo.getClient().readQuery({ query, variables: { checkoutID: environment.basketKey } });
      console.log(data);
      console.log(data.basket.items, result.items);
      this.apollo.getClient().writeQuery({
        query,
        data: {
          basket: [...data.items, data.items.filter((item: any) => item !== -1)],
        },
      });
    });
  }
}
