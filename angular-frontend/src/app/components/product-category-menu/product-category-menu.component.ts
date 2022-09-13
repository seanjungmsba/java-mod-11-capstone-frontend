import { Component, OnInit } from "@angular/core";
import { ProductCategory } from "src/app/common/product-category";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-category-menu",
  templateUrl: "./product-category-menu.component.html",
  styleUrls: ["./product-category-menu.component.css"],
})
/*
 * Product Category Menu component is responsible for UI with regards to 
 * menu bar located in the left side that displays different meal categories
 */
export class ProductCategoryMenuComponent implements OnInit {

  // initialize empty array of ProductCategory
  productCategories: ProductCategory[] = [];

  // dependency injection
  constructor(private productService: ProductService) {}

  // call listProductCategories() when application starts up
  ngOnInit() {
    this.listProductCategories();
  }

  /* listProductCategories() tells ProductService to retrieve 
   * the list of product categories and assign them to the productCategories array 
   */ 
  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log("Product Categories=" + JSON.stringify(data));
      this.productCategories = data;
    });
  }
}