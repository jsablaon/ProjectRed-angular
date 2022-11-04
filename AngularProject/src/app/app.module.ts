import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    CartComponent,
    AccountComponent,
    OrderHistoryComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
