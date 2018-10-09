import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BasketService, BasketDto } from '../../shared/services/basket.service';
import { Basket, BasketItem } from '../../shared/models/basket.model';
import { ProductService } from '../../shared/services/product.service';
import { ServiceBus } from '../../serviceBus';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  basket: Basket = new Basket();
  modalClicked = false;
  subscription: Subscription;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private serviceBus: ServiceBus,
  ) {}

  ngOnInit(): void {
    console.log('basket is live');
    this.subscription = this.serviceBus.listenForAll().subscribe((event) => {
      if (event.type === 'addProductToBasket') {
        console.log('adding product to basket', event.data);
        this.modalClicked = true;
        this.getBasket();
      }

      if (event.type === 'openBasket') {
        this.modalClicked = !this.modalClicked;
      }

      if (event.type === 'deleteProduct') {
        console.log('deleting product from basket');
        this.basketService.deleteProductFromBasket(event.data).subscribe((basket) => {
          this.serviceBus.publish('productDeleted', event.data);
          console.log('deleted product ' + JSON.stringify(event.data));
          this.getBasket();
        });
      }

      if (event.type === 'clearBasket') {
        console.log('CLEARING BASKET', event.data);
        this.basket = new Basket();
      }
    });
  }

  onOpen(): void {
    console.log('opening basket ' + JSON.stringify(this.basket));
    this.serviceBus.publish('openBasket', this.basket);
    this.getBasket();
  }

  getBasket(): void {
    this.basket = new Basket();
    this.basketService.getBasket().subscribe((basket) => {
      console.log('getting basket', basket);
      this.getProductFromBasket(basket);
    });
  }

  getProductFromBasket(basket: Basket) {
    basket.items.forEach((item: any) => {
      this.productService.getProduct(item.id).subscribe((retrievedProduct) => {
        console.log('got product ' + JSON.stringify(retrievedProduct));
        const basketItem: BasketItem = new BasketItem(retrievedProduct);
        basketItem.quantity = item.quantity;
        basketItem.getTotalPrice();
        console.log('the basketitem ' + JSON.stringify(basketItem));
        this.basket.items.push(basketItem);
      });
    });
  }

  onClear(): void {
    this.basketService.deleteBasket().subscribe((basket) => {
      this.serviceBus.publish('clearBasket', basket);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
