import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ProductTableComponent } from './components/productsTable/product-table.component';
import { ErrorInterceptor } from './shared/services/interceptors/error.interceptor';
import { CurrencyFormatPipe } from './shared/pipes/currency-format.pipe';
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { ProductGridComponent } from './components/productsGrid/product-grid.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StockedPipe } from './shared/pipes/stocked.pipe';
import { ProductComponent } from './components/product/product.component';
import { SortableColumnComponent } from './components/sortableColumn/sortable-column.component';
import { ProductService } from './shared/services/product.service';
import { SortService } from './shared/services/sort.service';
import { SortableTableDirective } from './shared/directives/sortable-table.directive';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    ProductTableComponent,
    CurrencyFormatPipe,
    PercentagePipe,
    ProductDetailComponent,
    StockedPipe,
    ProductComponent,
    SortableColumnComponent,
    SortableTableDirective,
    BasketComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
    }),
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
