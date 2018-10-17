import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { Query, Product } from 'src/graphql-types';
import { AddOrUpdateProductMutation } from 'src/app/shared/graphql/mutations/add-or-update-product.graphql';
import { tap, map } from 'rxjs/operators';
import { GetProductQuery } from 'src/app/shared/graphql/queries/product.graphql';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/selectors/product.selector';
import { DeleteProductMutation } from 'src/app/shared/graphql/mutations/delete-product.graphql';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  productForm: FormGroup;
  productId: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private addOrUpdateProductMutation: AddOrUpdateProductMutation,
    private getProductQuery: GetProductQuery,
    private deleteProductMutation: DeleteProductMutation,
  ) {
    this.productForm = new FormGroup({
      sku: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      basePrice: new FormControl(''),
      stocked: new FormControl(''),
      image: new FormControl({ value: '', disabled: true }),
      desc: new FormControl(''),
    });
    this.productId = parseInt(this.route.snapshot.params.id, 0);
  }

  ngOnInit(): void {
    if (this.productId) {
      this.getProductQuery.watch({ id: this.productId }).valueChanges.subscribe((result) => {
        this.product = result.data.product;
        this.productForm.patchValue(result.data.product);
      });
    }
  }

  onDelete(): void {
    if (this.product) {
      this.deleteProductMutation
        .mutate({
          key: this.product.id,
        })
        .subscribe((result) => {
          this.location.back();
        });
    }
  }

  onSubmit(productForm: FormGroup): void {
    if (!productForm.valid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }
    // make sure stocked is actually a boolean
    productForm.value.stocked = productForm.value.stocked.toString().toLowerCase() === 'true' ? true : false;
    // make sure basePrice has a value, can't really send an empty string
    if (!productForm.value.basePrice) {
      productForm.value.basePrice = productForm.value.price;
    }
    console.log('aaa', productForm.value);
    this.addOrUpdateProductMutation.mutate(productForm.value).subscribe((result) => console.log(result));
  }

  onCancel(): void {
    this.location.back();
  }
}
