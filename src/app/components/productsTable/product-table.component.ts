import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.showTable();
  }

  showTable(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe((product) => {
      this.products = this.products.filter((deletedProduct) => deletedProduct.id !== product.id);
      this.toastr.success(`Product ${id} successfully deleted.`);
    });
  }
}
