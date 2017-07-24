declare var window: any;
import * as request                 from 'ajax-request';
import { Config, Local }            from '../sdk';
import { LoginButton }              from './dom';
import { TokenResponse }            from '../sdk';
import { AuthorizationResponse }    from '../sdk';

const GET = 'GET';
const POST = 'POST';

type OAuthClientInitConfig = {
    clientId: string;
    environment: 'dev'|'staging'|'prod';
    clientSecret?: string;
};

export type OAuthParameters = {
    redirectUri: string;
    scope: string;
    state?: string;
    username?: string;
    password?: string;
    grant_type?: 'password'|'client_credentials'|'token'|'authorization_code';
    [prop: string]: string;
};

/**
 * Main wrapper 360 connect class.
 */
export class OAuth
{
    private config: any;
    private logo: any;
    private clientConfig: OAuthClientInitConfig;
    private requiredOAuthParams: Array<string> = []

    static AUTH_PATH = ['oauth', 'v2', 'auth'];         // rest/oauth/v2/auth
    static TOKEN_PATH = ['oauth', 'v2', 'token'];       // rest/oauth/v2/token
    static LOGIN_PATH = ['oauth', 'v2', 'auth'];

    static ANON_SCOPE = 'anon_scope';
    static REDUCED_SCOPE = 'reduced_scope';
    static FULL_SCOPE = 'full_scope';
    static DEFAULT_SCOPE = 'anon_scope';

    private popup: any = null;
    private onLogin: Function = () => {};

    constructor()
    {

    }

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
        params.response_type = 'code';

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

    loginPrompt(params: OAuthParameters)
    {
        this.popup = window.open(this.getLoginUrl(params), '_blank', 'status=0,toolbar=0,height=610,width=540');
        return this;
    }

    // loginWithApiKey(apiKey: string, params: OAuthParameters)
    // {
    //     const url = this.endpoint(['rest', 'login']);
    //     const headers = this.jsonHeaders();
    //     const opts = { url: url, method: POST, headers: headers, data: { api_key: apiKey } }
    //
    //     return new Promise((resolve, reject) => {
    //         request(opts, (err, res, body) => {
    //             if (res.statusCode === 200) {
    //                 resolve(new TokenResponse(JSON.parse(body)));
    //             } else {
    //                 resolve(new TokenResponse(JSON.parse(body)));
    //             }
    //         });
    //     });
    //
    //     // this.popup = window.open(url, '_blank', 'status=0,toolbar=0,height=610,width=540');
    //     // return this;
    // }

    afterLogin(method: Function)
    {
        this.onLogin = method;
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

    getLoginStatus(refresh: boolean = false)
    {
        const url = this.endpoint(['api', 'user', 'status']);
        const headers = this.authHeaders();

        // if we skip cached responses
        if (refresh === false) {
            const data = Local.retrieve('loginStatus');

            if (data != null) {
                // dispatch change on the user, the LoginButton listens to this
                return Promise.resolve(new TokenResponse(data));
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
                resolve(new TokenResponse(data));

            });
        });
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

    dispatchStatusChangeEvent(status: string)
    {
        const event = new CustomEvent('status:change', { detail: { status: status, user: this.getUser() } });
        window.dispatchEvent(event);
    }
    
    requestAuthorizationCode(params: OAuthParameters)
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
                    resolve(new TokenResponse(data));

                } else {
                    this.dispatchStatusChangeEvent('unauthorized');
                    resolve(new TokenResponse(data));
                }
            });
        });
    }

    requestPasswordGrants(params: OAuthParameters)
    {
        params.grant_type = 'password';
        params.clientId = this.clientConfig.clientId
        params.clientSecret = this.clientConfig.clientSecret;

        this.require(['username', 'password', 'scope']);
        const url = this.endpoint(OAuth.TOKEN_PATH, params);

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (res.statusCode === 200) {
                    resolve(new TokenResponse(JSON.parse(body)));
                } else {
                    resolve(new TokenResponse(JSON.parse(body)));
                }
            });
        });
    }

    requestImplicitGrants(params: OAuthParameters)
    {
        params.clientId = this.clientConfig.clientId
        params.clientSecret = this.clientConfig.clientSecret;

        const url = this.endpoint(OAuth.TOKEN_PATH, params);

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (res.statusCode === 200) {
                    resolve(new TokenResponse(JSON.parse(body)));
                } else {
                    resolve(new TokenResponse(JSON.parse(body)));
                }
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

    private require(keys: Array<string>)
    {
        this.requiredOAuthParams = keys;
        return this;
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
