import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../common/product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: "root",
})
/* Product Service is responsible for communicating with the
 * server to retrieve the list of products and product categories */
export class ProductService {
  // define urls
  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";

  // HttpClient dependency injection since client needs to communicate with the server
  constructor(private httpClient: HttpClient) {}

  /* getProduct() returns Observable of Product from API call */
  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  /* getProductList() returns Observable of Product[] from API call */
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  /* searchProducts() returns Observable of Product[] from API call */
  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  /* getProducts() is a helper method that unwraps JSON object into Observable of Product[] object */
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  /* getProductListPaginate() returns Observable of GetResponseProducts from API call
   * thePage and thePageSize are specified so it can display the specified number of items per page
   * note that this method returns Observable through finding products by its category id
   */
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    // need to build URL based on category id, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /* searchProductsPaginate() returns Observable of GetResponseProducts from API call
   * thePage and thePageSize are specified so it can display the specified number of items per page
   * note that this method returns Observable through finding products by its product name
   */
  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    // need to build URL based on keyword, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /* getProductCategories() is a helper method that unwraps
   * JSON object into Observable of ProductCategory[] object */
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

/* this interface stores JSON object from GET request on http://localhost:8080/api/products */
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

/* this interface stores JSON object from GET request on http://localhost:8080/api/product-category */
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
