import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../shared/models/basket.model';
import { ServiceBus } from '../../serviceBus';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input()
  product: Product;
  quantity: number;

  constructor(private basketService: BasketService, private serviceBus: ServiceBus) {}

  onAddProduct(): void {
    this.basketService.addToBasket(this.product, this.quantity).subscribe((basket) => {
      this.serviceBus.publish('addProductToBasket', basket);
    });
  }
}
