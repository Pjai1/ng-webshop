import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.showPanel();
  }

  showPanel(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
