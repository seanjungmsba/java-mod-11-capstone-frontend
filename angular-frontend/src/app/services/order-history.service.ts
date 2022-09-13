import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderHistory } from "../common/order-history";

@Injectable({
  providedIn: "root",
})
/* OrderHistory Service is responsible for communicating with the
 * server to retrieve the order history for each customer */
export class OrderHistoryService {
  // define url
  private orderUrl = "http://localhost:8080/api/orders";

  // HttpClient dependency injection since client needs to communicate with the server
  constructor(private httpClient: HttpClient) {}

  /* getOrderHistory() takes email address and returns Observable of GetResponseOrderHistory object */
  getOrderHistory(email: string): Observable<GetResponseOrderHistory> {
    // build URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}`;

    // return the REST API object
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

/* this interface stores JSON object from GET request on
 * `http://localhost:8080/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}`*/
interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  };
}
