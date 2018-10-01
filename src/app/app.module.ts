import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
