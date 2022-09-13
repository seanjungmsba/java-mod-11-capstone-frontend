import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Purchase } from "../common/purchase";

@Injectable({
  providedIn: "root",
})
/* Checkout Service is responsible for communicating with the
 * server to post checkout information of each customer */
export class CheckoutService {
  // define url
  private purchaseUrl = "http://localhost:8080/api/checkout/purchase";

  // HttpClient dependency injection since client needs to communicate with the server
  constructor(private httpClient: HttpClient) {}

  /* placeOrder() takes Purchase object and makes POST request on purchaseUrl */
  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
