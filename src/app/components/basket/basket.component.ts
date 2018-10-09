import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BasketService, BasketDto } from '../../shared/services/basket.service';
import { Basket, BasketItem } from '../../shared/models/basket.model';
import { ProductService } from '../../shared/services/product.service';
import { ServiceBus } from '../../serviceBus';
import { Subscription, forkJoin } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  basket: Basket = new Basket();
  modalClicked = false;
  subscription?: Subscription;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private serviceBus: ServiceBus,
  ) {}

  ngOnInit(): void {
    this.subscription = this.serviceBus.listenForAll().subscribe((event) => {
      if (event.type === 'addProductToBasket') {
        this.modalClicked = true;
        this.basket.addProduct(event.data.product, event.data.quantity);
        this.basketService.addToBasket(event.data.product, event.data.quantity).subscribe(() => {});
      }

      if (event.type === 'openBasket') {
        this.modalClicked = !this.modalClicked;
      }

      if (event.type === 'deleteProduct') {
        this.basketService.deleteProductFromBasket(event.data).subscribe((basket) => {
          this.serviceBus.publish('productDeleted', event.data);
          this.basket.deleteProduct(event.data);
        });
      }
    });
  }

  onOpen(): void {
    this.serviceBus.publish('openBasket', this.basket);
    this.getBasket();
  }

  getBasket(): void {
    this.basketService.getBasket().subscribe((basket) => {
      // far better to have one subscription compared to multiple with forkjoin
      const productSources: any = [];
      basket.items.forEach((item) => {
        productSources.push(this.productService.getProduct(item.id));
      });

      forkJoin<Product>(productSources).subscribe((products) => {
        products.forEach((product) => {
          basket.updateProductInfo(product);
        });
        this.basket = basket;
      });
    });
  }

  getProductFromBasket(basket: Basket) {
    basket.items.forEach((item: any) => {
      this.productService.getProduct(item.id).subscribe((retrievedProduct) => {
        this.basket.addProduct(retrievedProduct, item.quantity);
      });
    });
  }

  onClear(): void {
    this.basketService.deleteBasket().subscribe(() => {
      this.basket = new Basket();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
