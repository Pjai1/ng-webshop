import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ProductTableComponent } from './components/productsTable/product-table.component';
import { ProductService } from './shared/services/product.service';
import { ErrorInterceptor } from './shared/services/interceptors/error.interceptor';
import { PriceFormatPipe } from './shared/pipes/price-format.pipe';
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { ProductGridComponent } from './components/productsGrid/product-grid.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StockedPipe } from './shared/pipes/stocked.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    ProductTableComponent,
    PriceFormatPipe,
    PercentagePipe,
    ProductDetailComponent,
    StockedPipe,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
