import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { TableComponent } from './table/table.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right'
    }),
    InfiniteScrollModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
