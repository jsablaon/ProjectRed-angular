import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';

import { SignInComponent, LoginComponent}  from './login/login.component';  
import { GoogleSigninComponent }  from './google.signin';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    CartComponent,
    AccountComponent,
    GoogleSigninComponent,
    SignInComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
