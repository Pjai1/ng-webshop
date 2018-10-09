import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../store/product/product.reducers';
import { GetProductsAction } from 'src/app/store/product/product.actions';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProduct.State>) {
    this.products$ = this.store.select('products');
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProductsAction());
  }
}
