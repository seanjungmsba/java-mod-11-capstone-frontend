import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-status",
  templateUrl: "./cart-status.component.html",
  styleUrls: ["./cart-status.component.css"],
})
/* Cart Status component is responsible populating the data on cart icon located top right */ 
export class CartStatusComponent implements OnInit {

  // initialize total price and quantity of the cart
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  // dependency injection
  constructor(private cartService: CartService) {}

  // call updateCartStatus() method when app starts up 
  ngOnInit(): void {
    this.updateCartStatus();
  }

  /* updateCartStatus() tells CartService to update totalPrice and totalQuatity value accordingly */
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
