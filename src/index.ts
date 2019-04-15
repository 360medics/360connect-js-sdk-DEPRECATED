import {SimpleConnect} from './sdk';

const simple = new SimpleConnect();

// document.addEventListener('DOMContentLoaded', function(e) {
//     // ? good idea ?
// });

// create custom shadow DOM elements
// customElements.define('x-foo', XFooDOMElement);
// customElements.define('login-button', LoginButton);
// customElements.define('featured-content', FeaturedContent);

//connect.IMPLICIT_FLOW = OAuthFlows.IMPLICIT_FLOW;
//connect.PASSWORD_FLOW = OAuthFlows.PASSWORD_FLOW;
//connect.CLIENT_CREDENTIALS_FLOW = OAuthFlows.CLIENT_CREDENTIALS_FLOW;
//connect.AUTHORIZATION_FLOW = OAuthFlows.AUTHORIZATION_FLOW;

// export full module
module.exports = simple;
