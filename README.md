# 360 Connect JS SDK

<h1 align="center">
<img align="center" src="test/docs/login-button-loggedout.png" height="52" alt="360connect login button" style="display:block">
360 Connect JS SDK
</h1>

## Getting started on the web

Import the SDK js bundle into your HTML page (see also example in `index.html`).

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>360Connect JS SDK</title>
    <script src="../dist/360connect-js-sdk.bundle.js"></script>`
</head>
<body>
    ...
</body>
</html>
```

### Configuration

Configure the SDK with your API keys and client credentials. 
<br />
Choose `ENV=staging` for the sandbox (`beta.360medical.com`) or `ENV=prod` for (`360medical.com`)  or `ENV=dev` for (`360medical.localhost`) 

See also (notes about security in single page applications)[#security].


#### Initialization and Callback 
 
```javascript
const ENV = 'dev|staging|prod';
const CLIENT_KEY = '<MY_CLIENT_KEY>';
const USER_API_KEY = '<USER_API_KEY>';
//Send callback for each event (by setter or in params)
//Setter must be write before Connect.init({}) and setter has priority
Connect.onInit(function(){
    //[...Something when we begin Connect.init()]
});

Connect.onLogin(function(dataUser){
    //[...Something after login action and getting user data]
});

Connect.onLogout(function(){
    //[...Something after deleting token]
});

Connect.onLoginBtnRender(function(){
   //[...Something after rendering of login button] 
});

Connect.onLogoutBtnRender(function(){
   //[...Something after rendering of logout button] 
});

Connect.onError(function(){
   //[...Something when an error is catched] 
});

// initialize the SDK and load data
Connect.init({
    clientKey : CLIENT_KEY,
    environnement : ENV,
    apiKey: USER_API_KEY,
    onInit: function() {
        //[...]
    },
});
```

### Showing the login button

Show the login button (featuring user status) somewhere in your HTML <img src="test/docs/login-button-loggedout.png" height="17" alt="360connect login button" style="display:inline-block;margin-left:4px">.


```html
<login-button></login-button>
```

### Showing the logout button

Show the logout button (featuring user status) somewhere in your HTML.


```html
<logout-button></logout-button>
```
