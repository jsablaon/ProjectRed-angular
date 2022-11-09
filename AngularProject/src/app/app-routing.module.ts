import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


const routes: Routes = [
  {path: 'Account', component: AccountComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Home', component: HomescreenComponent},
  {path: 'Checkout', component: CheckoutComponent},
  {path: 'detail/:id', component: ItemDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
