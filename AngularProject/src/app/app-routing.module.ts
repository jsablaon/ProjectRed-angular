import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { HomescreenComponent } from './homescreen/homescreen.component';


const routes: Routes = [
  {path: 'Account', component: AccountComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Home', component: HomescreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
