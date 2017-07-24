import { Connect, OAuth }           from './sdk';
import { TokenResponse }            from './sdk';
import { AuthorizationResponse }    from './sdk';
import { LoginButton }              from './sdk/dom';

const connect = new Connect();
declare var window: any;

// create custom shadow DOM elements
// customElements.define('x-foo', XFooDOMElement);
customElements.define('login-button', LoginButton);

window.addEventListener('message', (e) => {
    connect.OAuth().afterPopup(e);
});

// export full module
module.exports = connect;
