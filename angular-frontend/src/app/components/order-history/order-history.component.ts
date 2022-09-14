import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
/* Order History component is responsible for displaying order 
 * data for the user who signed up and purchased items */
export class OrderHistoryComponent implements OnInit {

  // initialize empty array of OrderHistory
  orderHistoryList: OrderHistory[] = [];

  // reference to web browser's session storage
  storage: Storage = sessionStorage;
  
  // dependency injection of OrderHistoryService
  constructor(private orderHistoryService: OrderHistoryService) { }

  // call handleOrderHistory() when application starts up
  ngOnInit(): void {
    this.handleOrderHistory();
  }

  /* handleOrderHistory() correctly updates theEmail field and orderHistoryList */
  handleOrderHistory() {
    // read user's email address from browser storage
    // return null if it doesn't exist
    const theEmail = JSON.parse(this.storage.getItem('userEmail') || '{}');

    // retrieve data from the service using user's email address
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }

}
