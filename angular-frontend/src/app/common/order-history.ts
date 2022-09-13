/* stores order history of each customer */
export class OrderHistory {
  id: string = "";
  orderTrackingNumber: string = "";
  totalPrice: number = 0;
  totalQuantity: number = 0;
  dateCreated: Date = new Date();
}
