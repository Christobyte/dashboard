import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { shoppingCartItem, shoppingCartItems } from '../shoppingCartItem';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private message: MessageService, private http: HttpClient) { }

  private url: string = '../../assets/shopping-cart-items.json';
  public totalCartItemNumber: number = 0;
  public totalPrice: number = 0;
  public cartVisibility: boolean = false;
  public shoppingCartItems: shoppingCartItems = [];
  private crossesVisibilityStatusList: boolean[] = [];
  public alertVisibility: boolean = false;

  ngOnInit(): void {

    this.fetchData();
    this.prepareData();

    this.message.getCartVisibilityMessage().subscribe(cartVisibility => {
      this.cartVisibility = Boolean(cartVisibility);
    });
    this.message.getAltertVisibilityMessage().subscribe(alertVisibility => {
      this.alertVisibility = Boolean(alertVisibility);
    });
  }

  // Fetch Data from JSON
  private async fetchData() {
    await this.http.get<shoppingCartItems>(this.url)
    .pipe(
      map((data: any) => 
      this.shoppingCartItems = data.shopping_cart_items
      )
    ).subscribe();
  }

  // Makes sure the prepare function is executed only after the data from JSON is available
  private prepareData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          this.prepare()
          );
      }, 100);
    });
  }

  private prepare(): void {
    this.calculateTotalPriceAndItemNumber();
    // Initializes the crossesVisibilityStatusList with false
    for (let i: number = 0; i < this.shoppingCartItems.length; i++) {
      this.crossesVisibilityStatusList[i] = false;
    }
  }

  // Updates the item count
  public handleCounterChange(counterOperation: number, item: shoppingCartItem): void {
    if (counterOperation == -1) {
      if (item.count > 1) {
        item.count--;
      }
    } else {
      item.count++;
    }
    this.calculateTotalPriceAndItemNumber();
  }

  // Updates total number of items and total price
  private calculateTotalPriceAndItemNumber(): void {
    this.totalCartItemNumber = 0;
    this.totalPrice = 0;
    for (let i: number = 0; i < this.shoppingCartItems.length; i++) {
      this.totalCartItemNumber += this.shoppingCartItems[i].count;
      this.totalPrice += this.shoppingCartItems[i].count * this.shoppingCartItems[i].price;
    }
    // Submits the total number of items in cart to the badge in toolbar
    this.message.sendTotalCartItemNumberMessage(this.totalCartItemNumber);
  }

  // Removes single item from shopping cart
  public removeShoppingCartItem(item: shoppingCartItem): void {
    this.crossesVisibilityStatusList.splice(this.shoppingCartItems.indexOf(item), 1);
    this.shoppingCartItems.splice(this.shoppingCartItems.indexOf(item), 1);
    this.calculateTotalPriceAndItemNumber();
  }

  // Pressing "Checkout"
  public removeAllShoppingCartItems(): void {
     // Remove all items from shopping cart 
    this.crossesVisibilityStatusList.splice(0, this.shoppingCartItems.length);
    this.shoppingCartItems.splice(0, this.shoppingCartItems.length);
    this.calculateTotalPriceAndItemNumber();
    // Remove shopping cart visibility
    this.cartVisibility = false;
    this.message.sendCartVisibilityMessage(this.cartVisibility);
    // Triggers alert message after "Checkout" is done
    this.alertVisibility = true;
    this.message.sendAlertVisibilityMessage(this.alertVisibility);
  }

  // Updates the visibility of closing cross in cart item on mouseenter/-leave
  public setRemoveCrossVisibility(isVisible: boolean, item: shoppingCartItem): void {
    this.crossesVisibilityStatusList[this.shoppingCartItems.indexOf(item)] = isVisible;
  }

  // Returns the visibility of closing cross in cart item
  public getRemoveCrossVisibility(item: shoppingCartItem): boolean {
    return this.crossesVisibilityStatusList[this.shoppingCartItems.indexOf(item)];
  }

}
