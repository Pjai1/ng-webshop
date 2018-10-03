import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { first } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'table-view',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
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
}
