declare var window: any;
import * as request                 from 'ajax-request';
import { Config, Local }            from '../sdk';
import { OAuthParameters }          from '../sdk/oauth-type';
import { OAuthClientInitConfig }    from '../sdk/oauth-type';
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

    public static ANON_SCOPE = 'anon_scope';
    public static REDUCED_SCOPE = 'reduced_scope';
    public static FULL_SCOPE = 'full_scope';
    public static DEFAULT_SCOPE = 'anon_scope';

    private popup: any = null;
    private usingImplicitGrants: boolean = false;
    private onLogin: Function = () => {};

    constructor() { }

    initialize(clientConfig: OAuthClientInitConfig)
    {
        Config.init(clientConfig.environment);

        this.config = Config.getConfig()['api'];
        this.clientConfig = clientConfig;

        return this;
    }

    getEnv()
    {
        return this.clientConfig.environment;
    }

    getLoginUrl(params: OAuthParameters)
    {
        params.client_id = this.clientConfig.clientId;
        params.response_type = (params.response_type != null) ? params.response_type : 'code';

        this.require(['scope']);

        const loginUrl = this.endpoint(OAuth.LOGIN_PATH, params);
        return loginUrl;
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

    loginPrompt(params: OAuthParameters, implicitGrants: boolean = false)
    {
        if (implicitGrants === true) {
            this.usingImplicitGrants = true;
            params.response_type = 'token';
            window.location.href = this.getLoginUrl(params);
        } else {
            this.usingImplicitGrants = false;
            this.popup = window.open(this.getLoginUrl(params), '_blank', 'status=0,toolbar=0,height=610,width=540');
        }

        return this;
    }
    
    afterLogin(method: Function)
    {
        this.onLogin = method;

        // @todo To document VS hash VS afterLogin with normal flow !
        if (window.location.hash) {
            // then its a hash response !
            let data: any = {};
            const hash = window.location.hash.replace('#', '').split('&');

            for (let pair of hash) {
                let pr = pair.split('=');
                data[pr[0]] = pr[1];
            }

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
        params.clientId = this.clientConfig.clientId;
        params.clientSecret = this.clientConfig.clientSecret;

        this.require(['scope']);

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
        params.clientId = this.clientConfig.clientId
        params.clientSecret = this.clientConfig.clientSecret;

        this.require(['username', 'password', 'scope']);

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
     * Request implicit grants
     * http://oauthlib.readthedocs.io/en/latest/oauth2/grants/implicit.html
     * @todo Might be removed in the future if its not safe.
     * @deprecated
     */
    requestImplicitGrants(params: OAuthParameters): Promise<TokenResponse>
    {
        console.warn(`Requesting implicit grants is not recommended and will be decprecated.`);

        params.response_type = 'token';
        params.clientId = this.clientConfig.clientId
        params.clientSecret = this.clientConfig.clientSecret;

        // this.require(['username', 'password', 'scope']);

        const url = this.endpoint(OAuth.TOKEN_PATH, params);

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (res.statusCode === 200) {
                    resolve(new TokenResponse(JSON.parse(body), res));
                } else {
                    resolve(new TokenResponse(JSON.parse(body), res));
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
     *
     *
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
}
