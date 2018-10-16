import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { AddItemToBasketMutation } from 'src/app/shared/graphql/mutations/add-item-to-basket.graphql';
import { environment } from 'src/environments/environment';
import { IBasket, CreateBasket } from 'src/app/shared/selectors/basket.selector';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  quantity = 1;
  @Output()
  addedProduct = new EventEmitter<IBasket>();

  constructor(private addItemToBasketMutation: AddItemToBasketMutation) {}

  ngOnInit(): void {}

  onAddProduct(): void {
    this.addItemToBasketMutation
      .mutate({
        key: environment.basketKey,
        item: {
          quantity: this.quantity,
          productId: this.product.id,
        },
      })
      .subscribe((result) => (this.addedProduct = result.data.basket));
  }
}
