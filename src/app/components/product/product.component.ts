import { Component, Input, OnInit } from '@angular/core';
import { AddItemToBasketMutation, IProduct } from 'src/app/shared/graphql/mutations/add-item-to-basket.graphql';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input()
  product: IProduct;
  quantity = 1;

  constructor(private addItemToBasketMutation: AddItemToBasketMutation) {}

  ngOnInit(): void {}

  onAddProduct(): void {
    this.addItemToBasketMutation.execute(this.product, this.quantity).subscribe();
  }
}
