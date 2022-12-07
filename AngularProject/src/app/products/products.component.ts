import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TargetService, ItemService } from '../item.service';
import { User } from '../user';
import { UserService } from '../user.service'
import { TargetItem } from '../item'
import { Router} from '@angular/router'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('keywordInput') keywordInput: ElementRef;

  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};

  targetItems: TargetItem[] = [];

  constructor(private router: Router, private itemService: ItemService, private targetService: TargetService, private userService: UserService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ID:') === null){
      this.currentUser.Name = 'Please Log In';
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.getUser();
    }
    if(sessionStorage.getItem("storeId") === null){
      alert("Please select a store in the home page.")
      this.router.navigate(['/Home']);
    }
  }

  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
  }

  // Target functions
  getTargetItems(storeId: string, keyword: string, userId: string): void{
    console.log(`storeId: ${storeId} | keyword: ${keyword} | userId: ${userId}`)
    this.targetService.getItems(storeId, keyword, userId)
    .subscribe(targetItems => this.targetItems = targetItems);
    console.log(this.targetItems);
  }

  findItems():void{
    let storeId = sessionStorage.getItem("storeId")
    let userId = sessionStorage.getItem('ID:')
    let keyword = this.keywordInput.nativeElement.value

    console.log(`===============> storeId: ${storeId} | keyword: ${keyword}`)

    this.targetService.findItems(storeId, keyword, userId)
    setTimeout( () => {
      this.getTargetItems(storeId, keyword, userId);
    }, 2000)
  }

  selectItem(item: TargetItem){
    console.log(`++++++selected item = userId:${item.userId} | storeId:${item.storeId} | itemId:${item.itemId} | itemPrice: ${item.itemPrice}`)

    let formattedPrice = item.itemPrice.substring(1)
    console.log(`formatted Price : ${formattedPrice}`)
    let floatPrice = parseFloat(formattedPrice)
    console.log(`floatPrice: ${floatPrice} | data Type: ${typeof(floatPrice)}`)
    // add logic here to push items to server to db
    // console.log(`itemQty = ${this.itemQty.nativeElement.value}`)
    let selectedItem = {
      userId: item.userId,
      storeId: item.storeId,
      itemId: item.itemId,
      itemQty: 1,
      itemName: item.itemName,
      itemPrice: floatPrice,
      itemImage: item.itemImage,
      itemVideo: item.itemVideo
    }
    console.log(selectedItem)
    this.itemService.addItem(selectedItem).subscribe();
  }

}
