import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { first } from "rxjs/operators";
import { Product } from "../shared/models/product.model";

@Component({
    selector: 'panel-view',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {
    private products: Product[] = [];

    constructor(private productService: ProductService){}

    ngOnInit(): void{
        console.log('panel is live');
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
                console.log("Products Retrieved "+ JSON.stringify(this.products));
            });
    }
}