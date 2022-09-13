import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
/* Cart Service is responsible for modifying and manipulating the cart items */
export class CartService {
  // initialize CartItem[]
  cartItems: CartItem[] = [];

  // An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers.
  // BehaviorSubject is a variant of a Subject which has a notion of the current value that it stores and emits to all new subscriptions
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // sessionStorage: data persistent from web page refresh and login/logout but not from webpage exit
  // localStorage: similar to sesionStorage but also persistent from browser exit
  storage: Storage = localStorage;

  /* constructor tries to retrieve the cart item from the seesion and compute cart totals */
  constructor() {
    // read data from storage
    // note: '!' (aka non-null assertion operator) is used to tell the compiler that
    // "this expression cannot be null or undefined here
    // JSON.parse() converts string value to Js/Ts object
    let data = JSON.parse(this.storage.getItem("cartItems")!);

    // check once again to ensure data is not null
    if (data != null) {
      this.cartItems = data;

      // compute totals based on data that is read from storage
      this.computeCartTotals();
    }
  }

  /* addToCart() takes the CartItem and compute cart totals */
  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;

    // let existingCartItem: CartItem = undefined;
    let existingCartItem: CartItem = new CartItem();

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      )!;

      // check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  /* computeCartTotals() simply calculates cart totals based on price of each items and its quantity */
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice!;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart items
    this.persistCartItems();
  }

  /* logCartData() literally logs each item in the cart in terms of its price and quantiy and subtotal thereof */
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart");
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice!;
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log("----");
  }

  /* persistCartItems() ensures that cart items stay the same after webpage refreshing and/or login/logout */
  persistCartItems() {
    // first argument is the key and the second argument is the value
    this.storage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  /* decrementQuantity() decrement item quantity in cart */
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  /* remove() removes item from cart */
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      // splice() method changes the content of an array, adding new elements while removing old elements
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}