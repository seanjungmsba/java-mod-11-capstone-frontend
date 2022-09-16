# Capstone Project - Angular Frontend
 
## Running Angular Application 
1. Open Angular application.
2. Open terminal and navigate to the directory by `cd .\angular-frontend\`.
3. Run the following command `ng serve --open`.
*(Please make sure that Spring boot application is running in the background)*


### 1. API
**Does application support CRUD action?** 

**&rarr;** Yes, the user can **create** cart items by clicking `Add to cart` button, which is **read** and displayed in the cart status page when user clicks the cart icon on the top. items in the cart can be **updated** such that item quantity can be either incremented or decremented. Finally, a particular item can be **deleted** from cart by clicking `remove` button.

**Does application have a good error handling strategy?** 

**&rarr;** Yes, application implements input validation in `Checkout` component to ensure that user enters valid information in the checkout page and `StoreValidators` to ensure whitespaces are properly handled. For example, credit card number should exactly be 16-digits and the credit card expiration month and year cannot be that of the past.

### 2. UX/UI

**Are application totally easy to use and navigate?**

**&rarr;** Generally speaking, this application is very easy to use for anyone who has experience shopping online before. User can easily navigate to different items by clicking the menu bar on the left and simply clicking `Add to cart` button to put items into the cart. Then, cart button on the top banner can be clicked to see the details of the cart. User can also check out cart items by clicking `Checkout` button on the bottom right. Entering user's contact, address, and credit card information is self-explanatory. Login and logout functionality also resembles that of other e-commerce websites such as Amazon and Shopify. Therefore, it can be said that this application is easy to use and navigate.

**Does the application look pleasing?**

**&rarr;** Yes. It looks quite pleasing at least in my eyes. Font size is big enough to see the title and description of each meal item. Icons for cart button is big enough for visually impaired individuals to still recognize one. Buttons like `Login` and `Add to cart` are also noticeable on the application.


### 3. Auth

**Can evaluator access the routes that are not supposed to be accessed?**

**&rarr;** No. For example, order history can only be accessed by the user who sign into the application. `http://localhost:4200/order-history` is thus only accessible for those who have login credentials.

**Can user login and logout?**

**&rarr;** Yes. Please feel free to use the following sample credential to log into the app as the user:

- **Username:** `john.doe@demo.com`

- **Password:** `QazxsW1323`

logging out of the session is also done seamlessly by clicking `logout` button located on the top right corner.

**Can user register its account?**

**&rarr;** Yes and no. The application uses Okta for its authentification service provider. Given that self-service registration feature is [recently deprecated](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-self-service.htm), user can only sign up new accounts using [Okta dashboard](https://dev-38035794-admin.okta.com/admin/users), giving account admin a sole authority to sign up for new accounts.

**Does refreshing still persist login status?**

**&rarr;** Yes, the application uses session storage to ensure the login credential still persists after page refreshes and browser exit. 
