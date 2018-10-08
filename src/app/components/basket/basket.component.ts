import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
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
  basketItems: BasketItem[];
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
        console.log('adding product to basket');
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
    });
  }

  onOpen(): void {
    console.log('opening basket ' + JSON.stringify(this.basket));
    this.serviceBus.publish('openBasket', this.basket);
    this.getBasket();
  }

  getBasket(): void {
    this.basketItems = [];
    this.basketService.getBasket().subscribe((basket) => {
      console.log('getting basket', basket);
      this.getProductFromBasket(basket);
    });
  }

  getProductFromBasket(basket: any) {
    this.basket.totalPrice = 0;
    this.basket.items = [];
    const basketArr = Object.values(basket);
    console.log('basketArr ' + JSON.stringify(basket));
    basketArr.forEach((item: any, i: number) => {
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
    console.log('clear');
    this.basketService.deleteBasket().subscribe((basket) => {
      console.log('basket clear' + JSON.stringify(basket));
      this.basket = new Basket();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
