import { Component, OnInit } from "@angular/core";
import { OktaAuthService } from "@okta/okta-angular";

@Component({
  selector: "app-login-status",
  templateUrl: "./login-status.component.html",
  styleUrls: ["./login-status.component.css"],
})
/* Login Status component is responsible for getting 
 * user data and logging out of the session for logged-in user */
export class LoginStatusComponent implements OnInit {

  // initialize the variables
  isAuthenticated: boolean = false;
  userFullName?: string = "";

  // sessionStorage is used to make sure user is still signed in after page refresh or exit
  storage: Storage = sessionStorage;

  // dependency injection of OktaAuthService
  constructor(private oktaAuthService: OktaAuthService) {}

  // when application starts up, it asks OktaAuthService to 
  // find out status of authentification and display user details
  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  /* as name suggests, getUserDetails() correctly assigns or updates userFullName and theEmail fields */
  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then((res) => {
        // retrieve the user's name from authentication response
        this.userFullName = res.name;

        // retrieve the user's email from authentication response
        const theEmail = res.email;

        // now store the email in browser storage
        this.storage.setItem("userEmail", JSON.stringify(theEmail));
      });
    }
  }

  /* logout() logs user out of the session */
  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }
}
