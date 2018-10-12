import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
import { SortableTableDirective } from './shared/components/sortableColumn/sortable-table.directive';
import { BasketComponent } from './components/basket/basket.component';
import { SortableColumnComponent } from './shared/components/sortableColumn/sortable-column.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { environment } from 'src/environments/environment';
import { ProductEffects } from './store/product/product.effects';
import { FormStateDataDirective } from './shared/directives/formStateData.directive';
import { BasketEffects } from './store/basket/basket.effects';

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
    FormStateDataDirective,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
    }),
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'Euricom Webshop',
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([ProductEffects, BasketEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    [
      {
        provide: APOLLO_OPTIONS,
        useFactory(httplink: HttpLink) {
          return {
            cache: new InMemoryCache(),
            link: httplink.create({
              uri: environment.graphQlUrl,
            }),
          };
        },
        deps: [HttpLink],
      },
    ],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
