import * as mixpanel from 'mixpanel-browser';
import * as request                 from 'ajax-request';
import { Connect, Config, Local }   from '../sdk';
import { OAuthParameters }          from '../sdk/oauth-type';
import { OAuthClientInitConfig }    from '../sdk/oauth-type';
import { QueryParams }              from '../sdk/oauth-http';
import { TokenResponse }            from '../sdk/oauth-http';
import { AuthorizationResponse }    from '../sdk/oauth-http';

const GET = 'GET';
const POST = 'POST';

/**
 * Main wrapper 360 connect class.
 */
export class OAuth
{
    protected config: any;
    protected clientConfig: OAuthClientInitConfig;
    protected requiredOAuthParams: Array<string> = [];

    public static AUTH_PATH = ['oauth', 'v2', 'auth'];         // rest/oauth/v2/auth
    public static TOKEN_PATH = ['oauth', 'v2', 'token'];       // rest/oauth/v2/token
    public static LOGIN_PATH = ['oauth', 'v2', 'auth'];

    public IMPLICIT_FLOW = 'implicit';
    public PASSWORD_FLOW = 'password';
    public CLIENT_CREDENTIALS_FLOW = 'client_credentials';
    public AUTHORIZATION_FLOW = 'authorization_code';

    public static ANON_SCOPE = 'anon_scope';
    public static REDUCED_SCOPE = 'reduced_scope';
    public static FULL_SCOPE = 'full_scope';
    public static DEFAULT_SCOPE = 'anon_scope';

    private popup: any = null;
    private onLogin: Function = () => {};
    private userApiKey: string = null;

    constructor() {}

    initialize(clientConfig: OAuthClientInitConfig)
    {
        this.config = Config.getConfig()['api'];
        this.clientConfig = clientConfig;
        this.clientConfig.flow = (typeof this.clientConfig.flow === 'undefined') ? this.AUTHORIZATION_FLOW : this.clientConfig.flow;
        return this;
    }

    getEnv()
    {
        return this.clientConfig.environment;
    }

    /**
     * The login url can vary from a classic authorization mode (client secret is not needed)
     * and a implicit mode where client secret is neede (see FOSOAuthServerBundle requires it)
     *
     * A few more params for the backend are also passed (oauth to 1), and an optional
     * user api key to skip login if valid (using the symfony api key guard authenticator)
     */
    getLoginUrl(params: OAuthParameters)
    {
        // least requirements
        this.require(['scope']);

        // ever needed parameters
        params.is_oauth = 1; // always add a usefull for symfony backend
        params.clientId = this.clientConfig.clientId;
        params.clientSecret = this.clientConfig.clientSecret;

        // response type vaires depending on oauth mode
        if (this.clientConfig.flow === this.AUTHORIZATION_FLOW) {
            params.response_type = 'code';

        } else if (this.clientConfig.flow === this.IMPLICIT_FLOW) {
            params.response_type = 'token';
        } else {
            throw new Error(`@360connect: invalid value for flow when building login url`);
        }

        // optional skip login window using our
        // backend guard api key authenticator
        if (null !== this.userApiKey) {
            params.api_key = this.userApiKey;
        }

        const loginUrl = this.endpoint(OAuth.LOGIN_PATH, params);
        return loginUrl;
    }

    setUserApiKey(apiKey: string)
    {
        this.userApiKey = apiKey;
        return this;
    }

    loading(bool: boolean)
    {

        if (true === bool) {
            this.dispatchStatusChangeEvent('loading');
        } else {

        }
    }

    logout()
    {
        Local.erase('time');
        Local.erase('loginStatus');
        Local.erase('authorizationTokens');

        this.dispatchStatusChangeEvent('logout');
    }

    /**
     * Show either a loggin popup or redirect to authorization
     * depending if normal auth is used or implicit grants.
     * When implicit grant are used the auth window will redirect to redirect_uri
     * with access_token (and rest of response) in a hash tag.
     * This is why we must parse this hash and simulate the "afterLogin" trigger
     * otherwised normaly listened to in index.ts manually
     */
    login(params: OAuthParameters)
    {
        // a different url will be build depending on the oauth
        // grant mode chosen (can be authorization code or implicit at this point)
        const loginUrl = this.getLoginUrl(params);

        // if we are using a normal popup mode (for the web)
        // just trigger a popup with the authorization page
        // else redirect when using implicit grants
        if (this.clientConfig.flow === this.IMPLICIT_FLOW) {
            window.location.href = this.getLoginUrl(params);

        } else {
            this.popup = window.open(this.getLoginUrl(params), '_blank', 'status=0,toolbar=0,height=610,width=540');
        }

        return this;
    }

    afterLogin(method: Function)
    {
        this.onLogin = method;

        // when using implicit grants access token is returned as a query string behing
        // a hashtag url (implicit flow is specificaly designed for single page web apps)
        if (window.location.hash && this.clientConfig.flow === this.IMPLICIT_FLOW) {
            // then its a hash response !
            let data = QueryParams.getHashQueryParams();

            if (typeof(data.token_type !== 'undefined') && data.token_type === 'bearer') {
                // save local data and blahblah blah
                Local.save('authorizationTokens', data);
                this.dispatchStatusChangeEvent('authorized');
                data.origin = '_360connect';
                this.afterPopup({ data: data });
            }
        }

        return this;
    }

    afterPopup(e: any)
    {
        // @todo Popup on close does not trigger the next event
        if (this.popup !== null) {
            this.popup.close();
            this.popup = null;
        }

        if (e.data.origin != null && e.data.origin === '_360connect') {
            if (typeof this.onLogin === 'function') {
                this.onLogin(e.data);
            }
        }
    }

    getAccessToken()
    {
        const data = Local.retrieve('authorizationTokens');
        return (data == null) ? null : data.access_token;
    }

    setAccessToken(token: string)
    {
        // @todo
    }

    getUser()
    {
        const data = Local.retrieve('loginStatus');
        return (data === null) ? null : data.user;
    }

    getRefreshToken()
    {
        const data = Local.retrieve('authorizationTokens');
        return (data == null) ? null : data.refresh_token;
    }

    setRefreshToken(token: string)
    {
        // @todo
    }

    /**
     * Authorization code grants, the classic way for OAuth with a popup or redirection.
     * http://oauthlib.readthedocs.io/en/latest/oauth2/grants/authcode.html
     */
    requestAuthorizationCode(params: OAuthParameters): Promise<TokenResponse>
    {
        params.grant_type = 'authorization_code';
        params.client_id = this.clientConfig.clientId;
        params.client_secret = this.clientConfig.clientSecret;

        this.require(['scope', 'grant_type']);

        const url = this.endpoint(OAuth.TOKEN_PATH, params);

        this.dispatchStatusChangeEvent('loading');
        Local.erase('authorizationTokens');

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                const data = JSON.parse(body);

                if (res.statusCode === 200) {
                    Local.save('authorizationTokens', data);
                    this.dispatchStatusChangeEvent('authorized');
                    resolve(new TokenResponse(data, res));

                } else {
                    this.dispatchStatusChangeEvent('unauthorized');
                    resolve(new TokenResponse(data, res));
                }
            });
        });
    }

    /**
     * Request password grant type for use in mobile apps mainly.
     *
     * http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html
     */
    requestPasswordGrants(params: OAuthParameters): Promise<TokenResponse>
    {
        params.grant_type = 'password';
        params.client_id = this.clientConfig.clientId;
        params.client_secret = this.clientConfig.clientSecret;

        this.require(['username', 'password', 'scope', 'grant_type']);

        const url = this.endpoint(OAuth.TOKEN_PATH, params);

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                const data = JSON.parse(body);

                if (res.statusCode === 200) {
                    this.dispatchStatusChangeEvent('authorized');
                    resolve(new TokenResponse(data, res));
                } else {
                    this.dispatchStatusChangeEvent('unauthorized');
                    resolve(new TokenResponse(data, res));
                }
            });
        });
    }

    /**
     * Get login status from Oauth protected API endpoint.
     */
    getLoginStatus(refresh: boolean = false): Promise<TokenResponse>
    {
        const url = this.endpoint(['api', 'user', 'status']);
        const headers = this.authHeaders();

        // if we skip cached responses
        if (refresh === false) {
            const data = Local.retrieve('loginStatus');

            if (data != null) {
                // dispatch change on the user, the LoginButton listens to this
                this.tryToIdentifyProfile(data.user);
                return Promise.resolve(new TokenResponse(data, { statusCode: 200 }));
            }

        } else {
            Local.erase('loginStatus');
        }

        this.loading(true);

        return new Promise((resolve, reject) => {
            request({ url: url, method: POST, headers: headers }, (err, res, body) => {
                let data: any;

                if (res.statusCode === 200) {
                    data = JSON.parse(body);
                    this.tryToIdentifyProfile(data.user);
                } else {
                    // see APi endpoints server side
                    data = { status: 'unkown', user: null };
                }

                Local.save('loginStatus', data);
                // dispatch change on the user, the LoginButton listens to this
                this.dispatchStatusChangeEvent('login');
                resolve(new TokenResponse(data, res));

            });
        });
    }

    private endpoint(path: Array<string>, params: OAuthParameters = null)
    {
        params = this.configureOAuthParams(params);
        const url = `${this.config.PROTOCOL}://${this.config.DOMAIN}/${path.join('/')}`;

        let uris = [];

        for (let key in params) {
            if (params.hasOwnProperty(key) && params[key] != null) {
                uris.push(`${this.toSnakeCase(key)}=${params[key]}`);
            }
        }

        const uri = (uris.length > 0) ? `?${uris.join('&')}` : '';
        return `${url}${uri}`;
    }

    /**
     * Save access token and refresh token in the cache after success
     * Dispatch change status event for login/button or other UI stuff.
     */
    private onAuthSuccess(eventName: string, jsonAuthResData: any)
    {
        Local.save('authorizationTokens', jsonAuthResData);
        this.dispatchStatusChangeEvent('authorized');
    }

    private configureOAuthParams(params: OAuthParameters)
    {
        if (typeof params === 'undefined') {
            params = { redirectUri: null, scope: null };
        }

        for (let key of this.requiredOAuthParams) {
            if (typeof params[key] === 'undefined' || params[key] == null) {
                throw new Error(`OAuth parameter ${key} is required`);
            }
        }

        this.requiredOAuthParams = [];
        return params;
    }

    private dispatchStatusChangeEvent(status: string)
    {
        const event = new CustomEvent('status:change', { detail: { status: status, user: this.getUser() } });
        window.dispatchEvent(event);
    }

    private require(keys: Array<string>)
    {
        this.requiredOAuthParams = keys;
        return this;
    }

    private toSnakeCase(str: string)
    {
        return str.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    private authHeaders()
    {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${this.getAccessToken()}`,
        }
    }

    private jsonHeaders()
    {
        return {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }

    private tryToIdentifyProfile(userData: any)
    {
        if (null == userData) { return; }

        // full or reduced scopes
        if (typeof userData.email !== 'undefined') {
            mixpanel.identify(userData.email);
        } else {
            // anonymous scope, no one to identify oralias
        }
    }
}
