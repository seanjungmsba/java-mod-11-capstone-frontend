import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, lastValueFrom, Observable } from "rxjs";
import { OktaAuthService } from "@okta/okta-angular";

@Injectable({
  providedIn: "root",
})
/* The JWT Interceptor intercepts HTTP requests from the application
 * to add a JWT auth token to the HTTP Authorization header
 * if the user is logged in and the request is to the Angular app's API URL */
export class AuthInterceptorService implements HttpInterceptor {
  // injecting OktaAuthService dependency
  constructor(private oktaAuth: OktaAuthService) {}

  intercept(
    // The outgoing request object to handle
    request: HttpRequest<any>,
    // The next interceptor in the chain, or the backend if no interceptors remain in the chain.
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const theEndpoint = "http://localhost:8080/api/orders";
    const securedEndpoints = [theEndpoint];

    // .some() determines whether the specified callback function returns true for any element of securedEndpoints
    // .includes() returns true if searchString appears as a substring of the result of converting this object to a String
    if (securedEndpoints.some((url) => request.urlWithParams.includes(url))) {
      // get access token
      // await suspends the execution until an asynchronous function return
      // promise is fulfilled and unwraps the value from the Promise returned
      const accessToken = await this.oktaAuth.getAccessToken();

      // clone the request and add new header with access token
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + accessToken,
        },
      });
    }

    // lastValueFrom() -> Converts an observable to a promise by subscribing to the observable,
    // waiting for it to complete, and resolving the returned promise with
    // the last value from the observed stream.

    // Most interceptors transform the outgoing request before passing it to
    // the next interceptor in the chain, by calling next.handle(transformedReq)
    return await lastValueFrom(next.handle(request));
  }
}
