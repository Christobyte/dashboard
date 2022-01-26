import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private message: MessageService) { }

  public alertVisibility: boolean = false;
  public alertMessage: string = "Checkout Successful!";

  ngOnInit(): void {
    this.message.getAltertVisibilityMessage().subscribe(alertVisibility => {
      this.alertVisibility = Boolean(alertVisibility);
    });
  }
}
