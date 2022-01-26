import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GridContentComponent } from './grid-content/grid-content.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    GridContentComponent,
    ShoppingCartComponent,
    AlertComponent,
    CustomCurrencyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
