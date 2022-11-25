import { Component, OnInit } from '@angular/core';
import { CartItem, Item, Carts } from '../item';
import { ItemService } from '../item.service'
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  allCarts: Carts[] = [];
  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};


  constructor(private itemService: ItemService, private userService: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('ID:') === null) {
      this.loggedIn = false;
      this.currentUser.Name = 'Please Log In'
    }
    else {
      this.loggedIn = true;
      this.getCarts();
      this.getUser();
    }
  }

  getCarts(): void {
    this.itemService.getCarts().subscribe((carts) => {
      this.allCarts = carts.filter((i) => i.userId == sessionStorage.getItem('ID:'));
    });
  }

  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
}


}
