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


#### Initialization and Callback 
 
```javascript
const ENV = 'staging';
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

# Configuration de la base de données 360
## Ajout d'une ligne dans la table *auth_client*
- name : *Nom du client*
- key_client: *Clé du client à fournir permettant au script de valider la requête*
- redirect_url : *URL cible du client après la connexion de l'utilisateur*
- domain_url : *Domaine du client d'où provient la requête de connexion* (ex. beta.360medics.com)
- logo_client : *image encodée en base 64 qui sera affiché sur la page de choix d'anonymisation pour l'utilisateur*
- description_client : *Texte customisé par le client qui est affiché à l'utilisateur sur la page du choix d'anonymisation*
- custom_user_info : *Fonction PHP (ou accesseur) pour récupérer les données de l'Utilisateur ; Ce champ permet de by-passer le formulaire d'anonymisation*

