/* stores information about each order item such as its product id, quantity, unit price, and its image URL */
export class OrderItem {
  constructor(
    public productId: string,
    public unitPrice: number,
    public quantity: number,
    public imageUrl: string
  ) {}
}
