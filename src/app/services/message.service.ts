import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  totalCartItemNumberSubject = new Subject();
  cartVisibilitySubject = new Subject();
  alertVisibilitySubject = new Subject();

  constructor() { }

  sendTotalCartItemNumberMessage(totalCartItemNumber: number) {
    this.totalCartItemNumberSubject.next(totalCartItemNumber);
  }

  getTotalCartItemNumberMessage() {
    return this.totalCartItemNumberSubject.asObservable();
  }

  sendCartVisibilityMessage(cartVisibility: boolean) {
    this.cartVisibilitySubject.next(cartVisibility);
  }

  getCartVisibilityMessage() {
    return this.cartVisibilitySubject.asObservable();
  }

  sendAlertVisibilityMessage(alertVisibility: boolean) {
    this.alertVisibilitySubject.next(alertVisibility);
  }

  getAltertVisibilityMessage() {
    return this.alertVisibilitySubject.asObservable();
  }
}
