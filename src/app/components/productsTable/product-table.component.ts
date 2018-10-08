import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from '../../shared/services/sort.service';
import { ServiceBus } from '../../serviceBus';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService, private toastr: ToastrService, private serviceBus: ServiceBus) {}

  ngOnInit(): void {
    this.subscription = this.serviceBus.listenForAll().subscribe((event) => {
      if (event.type === 'productDeleted') {
        this.productService.deleteProduct(event.data).subscribe((deletedProduct) => {
          console.log('we deleted ' + JSON.stringify(deletedProduct));
          this.products = this.products.filter((item) => item.id !== event.data.id);
          this.toastr.success(`Product ${event.data.sku} successfully deleted.`);
        });
      }
    });

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
    this.serviceBus.publish('deleteProduct', product);
  }

  onSorted(event: SortEvent): void {
    if (event.sortDirection === 'asc') {
      this.getProducts(event.sortColumn);
    } else {
      this.getProducts(`-${event.sortColumn}`);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
