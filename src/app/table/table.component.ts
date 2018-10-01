import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { first } from "rxjs/operators"
import { Product } from "../shared/models/product.model";

@Component({
    selector: 'table-view',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
    private products: Product[] = [];

    constructor(private productService: ProductService){}

    ngOnInit(): void {
        console.log('table is live');
        this.showTable();
    }

    showTable(): void {
        this.getProducts();
    }

    getProducts(): void { 
        this.productService.getProducts()
            .pipe(first())
            .subscribe((data: any) => {
                this.products = data.selectedProducts;
                console.log("Products Retrieved "+ JSON.stringify(this.products));
            });
    }
}