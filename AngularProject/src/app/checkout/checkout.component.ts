import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartItem, Carts, Item } from '../item';
import { ItemService } from '../item.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild("billingName") billingName: ElementRef;
  @ViewChild("billingAddress1") billingAddress1: ElementRef;
  @ViewChild("billingAddress2") billingAddress2: ElementRef;
  @ViewChild("billingCity") billingCity: ElementRef;
  @ViewChild("billingState") billingState: ElementRef;
  @ViewChild("billingZip") billingZip: ElementRef;
  @ViewChild("billingPhone") billingPhone: ElementRef;
  @ViewChild("billingCountry") billingCountry: ElementRef;
  @ViewChild("shippingName") shippingName: ElementRef;
  @ViewChild("shippingAddress1") shippingAddress1: ElementRef;
  @ViewChild("shippingAddress2") shippingAddress2: ElementRef;
  @ViewChild("shippingCity") shippingCity: ElementRef;
  @ViewChild("shippingState") shippingState: ElementRef;
  @ViewChild("shippingZip") shippingZip: ElementRef;
  @ViewChild("shippingCountry") shippingCountry: ElementRef;
  @ViewChild("cardNumber") cardNumber: ElementRef;
  @ViewChild("cardExpiration") cardExpiration: ElementRef;
  @ViewChild("cardCsv") cardCsv: ElementRef;





  items: CartItem[] = [];
  subtotal:number = 0;
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'Checkout';
      this.getItems();

    }
  }

  getItems(): void {
    this.items = [];
    this.subtotal = 0;
    this.itemService.getItems().subscribe((items): CartItem[] => {
      
      //calculates subtotal
      items.forEach((item) => {
        if(item.userId == sessionStorage.getItem('ID:')){
          this.items.push(item);
          this.subtotal += item.itemPrice * item.itemQty;
        }
      });

      return this.items;
    });
  }

  finalizeCheckout(): void{
    
    let billingInfo: string = '';
    let shippingInfo: string = '';
    let paymentInfo: string = '';
    if(this.billingName.nativeElement.value != '')
    {
      billingInfo += this.billingName.nativeElement.value + (', ');
    }
    if(this.billingAddress1.nativeElement.value != '')
    {
      billingInfo += this.billingAddress1.nativeElement.value + (', ');
    }
    if(this.billingAddress2.nativeElement.value != '')
    {
      billingInfo += this.billingAddress2.nativeElement.value + (', ');
    }
    if(this.billingCity.nativeElement.value != '')
    {
      billingInfo += this.billingCity.nativeElement.value + (', ');
    }
    if(this.billingZip.nativeElement.value != '')
    {
      billingInfo += this.billingZip.nativeElement.value + (', ');
    }
    if(this.billingState.nativeElement.value != '')
    {
      billingInfo += this.billingState.nativeElement.value + (', ');
    }
    if(this.billingCountry.nativeElement.value != '')
    {
      billingInfo += this.billingCountry.nativeElement.value + (', ');
    }
    if(this.billingPhone.nativeElement.value != '')
    {
      billingInfo += this.billingPhone.nativeElement.value;
    }

    //shipping
    if(this.shippingName.nativeElement.value != '')
    {
      shippingInfo += this.shippingName.nativeElement.value + (', ');
    }
    if(this.shippingAddress1.nativeElement.value != '')
    {
      shippingInfo += this.shippingAddress1.nativeElement.value + (', ');
    }
    if(this.shippingAddress2.nativeElement.value != '')
    {
      shippingInfo += this.shippingAddress2.nativeElement.value + (', ');
    }
    if(this.shippingCity.nativeElement.value != '')
    {
      shippingInfo += this.shippingCity.nativeElement.value + (', ');
    }
    if(this.shippingZip.nativeElement.value != '')
    {
      shippingInfo += this.shippingZip.nativeElement.value + (', ');
    }
    if(this.shippingState.nativeElement.value != '')
    {
      shippingInfo += this.shippingState.nativeElement.value + (', ');
    }
    if(this.shippingCountry.nativeElement.value != '')
    {
      shippingInfo += this.shippingCountry.nativeElement.value;
    }
    
    paymentInfo = this.cardNumber.nativeElement.value + ', ' + this.cardExpiration.nativeElement.value + ', ' + this.cardCsv.nativeElement.value;

    let finalCart: Carts = {
        cartId: uuidv4(),
        userId: sessionStorage.getItem('ID:'),
        billingAddress: billingInfo,
        shippingAddress: shippingInfo,
        paymentInfo: paymentInfo,
        items: this.items,
      };
      //console.log(finalCart);
      this.itemService.addCart(finalCart).subscribe();

  }

}
