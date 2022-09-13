import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/common/cart-item";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-details",
  templateUrl: "./cart-details.component.html",
  styleUrls: ["./cart-details.component.css"],
})
/* Cart Details component is responsible for populating data 
 * when user clicks cart icon to see the details of the cart items */
export class CartDetailsComponent implements OnInit {

  // initialize the empty array of CartItem and totalPrice and totalQuantity
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  // dependency injection
  constructor(private cartService: CartService) {}

  // call listCartDetails() when application starts up
  ngOnInit(): void {
    this.listCartDetails();
  }

  /* listCartDetails() properly updates the variables and returns cart totals */
  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  /* incrementQuality() takes a CartItem object and add to the cart
   * quantity will be automatically incremented by the addToCart() method */
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  /* decrementQuantity() takes a CartItem object and decrement quantity
   * when quantity becomes zero, it is automatically removed from the cart */
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  /* remove() takes a CartItem object and remove the item from a cart using CartService */
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
