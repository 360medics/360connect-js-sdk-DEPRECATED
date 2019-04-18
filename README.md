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

Configure the SDK with your API keys and client credentials. Choose `ENV=staging` for the sandbox (`beta.360medical.com`).

See also (notes about security in single page applications)[#security].

```javascript
const ENV = 'staging';
const CLIENT_KEY = '<MY_CLIENT_KEY>';

// initialize the SDK
Connect.init({
    clientKey : CLIENT_KEY,
    environnement : ENV
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

### Checking logged in status
Subscribe to event 'has-data-user' to know if your user is connected
```javascript
document.getElementsByTagName('login-button').item(0).addEventListener('has-data-user', function (e) {
   document.getElementById('connected').classList.remove('hidden');
   document.getElementById('no-connected').classList.add('hidden');
   document.getElementById('name-user').innerText = Connect.user.toString();
});
```
Subscribe to event 'has-logout' to know when your user is disconnected
```javascript
document.getElementsByTagName('logout-button').item(0).addEventListener('has-logout', function (e) {
    document.getElementById('no-connected').classList.remove('hidden');
    document.getElementById('connected').classList.add('hidden');
    document.getElementById('name-user').innerText = '';
});
```
