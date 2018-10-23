import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

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
import { environment } from 'src/environments/environment';
import { defaults, resolvers } from './shared/graphql/resolvers.graphql';

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
    ApolloModule,
    HttpLinkModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
    }),
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    [
      {
        provide: APOLLO_OPTIONS,
        useFactory(httpLink: HttpLink) {
          const cache = new InMemoryCache();
          const http = httpLink.create({ uri: environment.graphQlUrl });
          const local = withClientState({
            cache,
            defaults,
            resolvers,
          });
          return { cache, link: local.concat(http) };
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
