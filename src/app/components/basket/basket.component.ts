import { Component, OnInit, HostListener } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { Basket, BasketItem } from '../../shared/models/basket.model';
import { ProductService } from '../../shared/services/product.service';
import { ServiceBus } from '../../serviceBus';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basketItems: BasketItem[];
  basket: Basket;
  modalClicked = false;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private serviceBus: ServiceBus,
  ) {}

  ngOnInit(): void {
    console.log('basket is live');
    this.serviceBus.listenForAll().subscribe((event) => {
      if (event.type === 'addProductToBasket') {
        this.modalClicked = true;
        this.getBasket();
      }
    });
  }

  @HostListener('click', ['$event'])
  onOpen(event: Event): void {
    console.log(event);

    if (event.srcElement.className !== 'btn btn-danger') {
      this.modalClicked = !this.modalClicked;
    }
    this.getBasket();
  }

  getBasket(): void {
    this.basketItems = [];
    this.basketService.getBasket().subscribe((basket) => {
      console.log(Object.values(basket));
      this.basket = basket;
      this.getProductFromBasket(this.basket);
    });
  }

  getProductFromBasket(basket: Basket) {
    const basketArr = Object.values(basket);

    basketArr.forEach((product) => {
      this.productService.getProduct(product.id).subscribe((retrievedProduct) => {
        const basketItem: BasketItem = new BasketItem(retrievedProduct);
        basketItem.quantity = product.quantity;
        this.basketItems.push(basketItem);
      });
    });
  }

  onClear(): void {
    console.log('clear');
    this.basketService.deleteBasket().subscribe((basket) => {
      console.log('basket clear' + JSON.stringify(basket));
    });
  }
}
