import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { SortEvent } from '../../shared/components/sortableColumn/sort.service';
import { ServiceBus } from '../../serviceBus';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GetProductsAction } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products$: Observable<Product[]>;
  subscription: Subscription;

  constructor(private productService: ProductService, private store: Store<fromProduct.State>) {
    this.products$ = this.store.pipe(select(fromProductRoot.getProductsEntitiesState));
  }

  ngOnInit(): void {}

  getProducts(sortProperty: string = ''): void {
    this.productService.getProducts(sortProperty).subscribe((data: any) => {
      this.products$ = data;
    });
  }

  deleteProduct(product: Product): void {
    if (this.product) {
      this.store.dispatch(new DeleteProductAction(this.product));
    }
  }

  onSorted(event: SortEvent): void {
    this.getProducts(event.sortExpression);
  }
}
