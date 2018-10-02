import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { first } from "rxjs/operators";
import { Product } from "../shared/models/product.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'panel-view',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {
    private products: Product[] = [];

    constructor(private productService: ProductService, private toastr: ToastrService){}

    ngOnInit(): void {
        this.showPanel();
    }

    showPanel(): void {
        this.getProducts();
    }

    getProducts(): void { 
        this.productService.getProducts()
            .pipe(first())
            .subscribe((data: any) => {
                this.products = data.selectedProducts;
            }, (error: HttpErrorResponse) => {
                this.toastr.error(<any>error.message, "Error Occurred with status "+<any>error.status);
            });
    }
}