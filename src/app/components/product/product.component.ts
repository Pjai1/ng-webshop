import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  quantity = 1;

  constructor() {}

  ngOnInit(): void {}

  onAddProduct(): void {}
}
