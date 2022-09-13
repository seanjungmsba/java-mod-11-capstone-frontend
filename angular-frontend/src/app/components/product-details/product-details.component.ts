import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/common/product";
import { ProductService } from "src/app/services/product.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { CartItem } from "src/app/common/cart-item";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
/* Product Details component is UI responsible displaying
 * product details when user clicks either image or title of the product 
 */
export class ProductDetailsComponent implements OnInit {

  // initialize the new Product object
  product: Product = new Product();

  // dependency injections
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  // run handleProductDetails() method when the application starts up
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  /* handleProductDetails() display a product based on product id */
  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;

    // getProduct based on product id using ProductService
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  /* addToCart() literally add a product to cart */
  addToCart() {

    // log product name and its price
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`
    );

    // initialize new CartItem based on the product infomation
    let theCartItem = new CartItem(
      this.product.id,
      this.product.name,
      this.product.imageUrl,
      this.product.unitPrice
    );

    // use CartService to add this cart item
    this.cartService.addToCart(theCartItem);
  }
}
