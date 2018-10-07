import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from '../../shared/services/sort.service';

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

  getProducts(sortProperty: string = ''): void {
    this.productService.getProducts(sortProperty).subscribe((data: any) => {
      this.products = data;
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe((deletedProduct) => {
      this.products = this.products.filter((item) => item.id !== product.id);
      this.toastr.success(`Product ${product.sku} successfully deleted.`);
    });
  }

  onSorted(event: SortEvent): void {
    if (event.sortDirection === 'asc') {
      this.getProducts(event.sortColumn);
    } else {
      this.getProducts(`-${event.sortColumn}`);
    }
  }
}
