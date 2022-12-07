import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  {path: 'Account', component: AccountComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Home', component: HomescreenComponent},
  {path: 'Checkout', component: CheckoutComponent},
  {path: 'detail/:id', component: ItemDetailComponent},
  {path: 'EditAccount', component: EditAccountComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'OrderHistory', component: OrderHistoryComponent},
  {path: 'Products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
