import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { AddItemToBasketMutation } from 'src/app/shared/graphql/mutations/add-item-to-basket.graphql';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  quantity = 1;

  constructor(private addItemToBasketMutation: AddItemToBasketMutation) {}

  ngOnInit(): void {}

  onAddProduct(): void {
    this.addItemToBasketMutation.execute(this.product, this.quantity);
  }
}
