import { Product } from "./product";

/* stores information about each cart items for each session */
export class CartItem {
  constructor(
    public id?: string,
    public name?: string,
    public imageUrl?: string,
    public unitPrice?: number,
    public quantity: number = 1
  ) {}
}
