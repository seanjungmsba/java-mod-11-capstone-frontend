import { Component, OnInit } from "@angular/core";
import { OktaAuthService } from "@okta/okta-angular";
import * as OktaSignIn from "@okta/okta-signin-widget";

import myAppConfig from "../../config/app-config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
/* Login component handles the login functionality */
export class LoginComponent implements OnInit {

  // initialize a variable of any type since it stores a wide variety of data
  oktaSignin: any;

  // dependency inejction of OktaAuthService
  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: "assets/images/logo.png",
      features: {
        registration: true,
      },
      baseUrl: myAppConfig.oidc.issuer.split("/oauth2")[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  // when application starts up, remove any sign-in and call renderEl() function
  // documentation: https://support.okta.com/help/s/article/okta-signin-widget-sp-login?language=en_US
  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        // this name should be same as div tag id in login.component.html
        el: "#okta-sign-in-widget",
      }, 
      (response: { status: string }) => {
        if (response.status === "SUCCESS") {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
