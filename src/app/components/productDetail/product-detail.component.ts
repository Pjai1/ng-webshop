import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { Query, Product } from 'src/graphql-types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  productId: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private apollo: Apollo,
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
    this.productId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.productId) {
      this.apollo
        .watchQuery<Query>({
          query: gql`
            {
              product(id: 1) {
                id
                sku
                stocked
                desc
                image
                title
                price
                basePrice
              }
            }
          `,
        })
        .valueChanges.subscribe((result) => {
          this.product = result.data.product;
          this.productForm.patchValue(this.product);
        });
    }
  }

  onDelete(): void {
    if (this.product) {
    }
  }

  onSubmit(productForm: FormGroup): void {
    if (!productForm.valid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }
    // make sure stocked is actually a boolean
    this.productForm.value.stocked = this.productForm.value.stocked.toLowerCase() === 'true' ? true : false;
    // make sure basePrice has a value, can't really send an empty string
    if (!this.productForm.value.basePrice) {
      this.productForm.value.basePrice = this.productForm.value.price;
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
