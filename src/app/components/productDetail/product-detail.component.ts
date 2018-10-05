import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product: Product;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
  ) {
    this.productForm = new FormGroup({
      sku: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]),
      basePrice: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      stocked: new FormControl(''),
      image: new FormControl({ value: '', disabled: true }),
      desc: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.productId ? this.getProduct() : (this.product = new Product());
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe((product) => {
      this.toastr.success(`Product ${this.productId} successfully deleted.`);
      this.location.back();
    });
  }

  saveProduct(productForm: FormGroup): void {
    if (this.productId === undefined) {
      this.productService.createProduct(this.productForm.value).subscribe((product) => {
        this.product = product;
        this.productId = product.id;
        this.toastr.success(`Product ${this.productId} successfully created.`);
      });
    } else {
      this.productService.saveProduct(this.productId, this.productForm.value).subscribe((product) => {
        this.product = product;
        this.toastr.success(`Product ${this.productId} successfully updated.`);
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
