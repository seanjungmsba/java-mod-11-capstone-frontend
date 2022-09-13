import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/common/product";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "src/app/common/cart-item";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list-grid.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {

  // properties for product list
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  // dependency injections
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  // list all products in the database when the application starts up
  ngOnInit() {
    // since I intend to update the URL parameter within the same component, I use a subscription
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  /* listProducts() simply displays products 
   * depends on route having a keyword or not, it can either display 
   * searched product based on keyword or list all products by category
  */
  listProducts() {

    // route.snapshot.paramMap is used if we intend not to update our URL 
    // parameter within the same component you are accessing it
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  /* handleSearchProducts() displays products by keyword typed in a search bar  */
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get("keyword")!;

    // if we have a different keyword than previous one, then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  /* handleListProducts() displays product by the category id */
  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // check if we have a different category than previous
    // note: Angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous one, then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    );

    // now get the products for the given category id
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  /* updatePageSize() takes string value to set its page size and reinitialize its page number to 1 */
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  /* processResult() is a helper method that assigns the products, thePageNumber, thePageSize, and theTotalElements 
   * when ProductService invokes searchProducts() or getProductList() to retrieve the data */
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  /* addToCart() takes the Product object to initialize new CartItem and add it to cart using CartService */
  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    let theCartItem = new CartItem(
      theProduct.id,
      theProduct.name,
      theProduct.imageUrl,
      theProduct.unitPrice
    );

    this.cartService.addToCart(theCartItem);
  }
}
