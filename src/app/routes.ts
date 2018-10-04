import { Routes } from '@angular/router';
import { ProductGridComponent } from './components/productsGrid/product-grid.component';
import { ProductTableComponent } from './components/productsTable/product-table.component';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';

export const appRoutes: Routes = [
  { path: 'home', component: ProductGridComponent },
  { path: 'list', component: ProductTableComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: '', component: ProductGridComponent, pathMatch: 'full' },
];
