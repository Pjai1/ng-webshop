import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import * as fromProduct from '../../store/product/product.reducers';
import * as fromProductRoot from '../../store/product/index';
import { Store, select } from '@ngrx/store';
import { GetProductAction, SaveProductAction, DeleteProductAction } from 'src/app/store/product/product.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  productForm: FormGroup;
  productId: number;
  subscription?: Subscription;

  constructor(private location: Location, private toastr: ToastrService, private store: Store<fromProduct.State>) {
    this.productForm = new FormGroup({
      sku: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      basePrice: new FormControl(''),
      stocked: new FormControl(''),
      image: new FormControl({ value: '', disabled: true }),
      desc: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        select('router'),
        first(),
      )
      .subscribe((router) => (this.productId = router.state.root.firstChild.params.id));

    this.subscription = this.store
      .pipe<Product>(select(fromProductRoot.getProductEntitiesState))
      .subscribe((product) => {
        this.product = product;
        if (product) {
          console.log('got the product', product);
          return this.productForm.patchValue(this.product);
        }
      });

    // this.store.dispatch(new GetProductAction(this.productId));
  }

  onDelete(): void {
    if (this.product) {
      this.store.dispatch(new DeleteProductAction(this.product));
    }
  }

  onSubmit(productForm: FormGroup): void {
    if (!productForm.valid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const oldProduct = Object.assign(new Product(), this.product, this.productForm.value);
    this.store.dispatch(new SaveProductAction(oldProduct));
  }

  onCancel(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
