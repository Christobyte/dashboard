import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private message: MessageService) { }

  public totalCartItemNumber: number = 0;
  private cartVisibility: boolean = false;

  ngOnInit(): void {
    this.message.getTotalCartItemNumberMessage().subscribe(totalCartItemNumber => {
      this.totalCartItemNumber = Number(totalCartItemNumber);
    });
    this.message.getCartVisibilityMessage().subscribe(cartVisibility => {
      this.cartVisibility = Boolean(cartVisibility);
    });
  }

  toggleShoppingCart() {
    this.cartVisibility = !this.cartVisibility;
    this.message.sendCartVisibilityMessage(this.cartVisibility);
  }

}

