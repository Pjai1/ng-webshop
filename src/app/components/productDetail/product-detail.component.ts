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
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      basePrice: new FormControl(''),
      stocked: new FormControl(''),
      image: new FormControl({ value: '', disabled: true }),
      desc: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params.id;

    this.product = new Product();
    if (productId) {
      this.getProduct(productId);
    }
  }

  getProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe((retrievedProduct) => {
      this.product = retrievedProduct;
      this.productForm.patchValue(this.product);
    });
  }

  onDelete(product: Product): void {
    this.productService.deleteProduct(this.product).subscribe((deletedProduct) => {
      this.toastr.success(`Product ${product.sku} successfully deleted.`);
      this.location.back();
    });
  }

  onSubmit(productForm: FormGroup): void {
    if (!productForm.valid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    this.product = Object.assign(this.product, this.productForm.value);

    this.productService.saveProduct(this.product).subscribe((product) => {
      this.product = product;
      this.toastr.success(`Product ${product.sku} successfully updated.`);
      this.location.back();
    });
  }

  onCancel(): void {
    this.location.back();
  }

  mergeFormAndProduct(formData: FormData, product: Product) {
    return Object.assign(formData, product);
  }
}
