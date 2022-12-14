import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductService } from "./services/product.service";

import { Routes, RouterModule } from "@angular/router";
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { LoginStatusComponent } from "./components/login-status/login-status.component";

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthGuard,
} from "@okta/okta-angular";

import { OktaAuth } from "@okta/okta-auth-js";
import AppConfig from "./config/app-config";
import { OrderHistoryComponent } from "./components/order-history/order-history.component";
import { AuthInterceptorService } from "./services/auth-interceptor.service";

// the advantage of using Okta instead of using regular OAuth is that
// once the user is authenticated, they are automatically redirected to the app
// instead of having to parse the response and storing the OAuth and OIDC tokens
// OktaCallbackComponent automatically handles this
const oktaConfig = AppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  {
    path: "order-history",
    component: OrderHistoryComponent,
    canActivate: [OktaAuthGuard],
  },
  { path: "login/callback", component: OktaCallbackComponent },
  { path: "login", component: LoginComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "search/:keyword", component: ProductListComponent },
  { path: "category/:id", component: ProductListComponent },
  { path: "category", component: ProductListComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", redirectTo: "/products", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
  ],
  providers: [
    ProductService,
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    // HTTP_INTERCEPTORS: token for HTTP interceptors
    // AuthInterceptorService is registered by being specified in useClass
    // multi informs angular that HTTP_INTERCEPTORS is a token for injection an array of values
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
