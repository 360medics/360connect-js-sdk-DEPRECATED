declare var window: any;
import * as request from 'ajax-request';
import { TokenResponse, AuthorizationResponse } from '../sdk';

type OAuthClientConfig = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
};

export type OAuthParameters = {
    state?: string;
    scope?: Array<string>;
};

/**
 * Main wrapper 360 connect class.
 */
export class OAuth
{
    private config: any;
    private clientConfig: OAuthClientConfig;

    static AUTH_PATH = ['oauth', 'v2', 'auth']; // rest/oauth/v2/auth
    static TOKEN_PATH = ['oauth', 'v2', 'token']; // rest/oauth/v2/token

    constructor()
    {
        this.config = require('../config/environment.dev.json')['oauth'];
    }

    initialize(clientConfig: OAuthClientConfig)
    {
        this.clientConfig = clientConfig;
        return this;
    }

    getLoginUrl()
    {
        return this.endpoint(['login']);
    }

    getToken(params: OAuthParameters = { state: null, scope: [] })
    {
        const endpoint = this.endpoint(OAuth.TOKEN_PATH);

        let url = `${endpoint}?grant_type=client_credentials&client_id=${this.clientConfig.clientId}&client_secret=${this.clientConfig.clientSecret}&redirect_uri=${this.clientConfig.redirectUri}`;

        // additional oauth parameters
        if (params.state !== null) {
            url += `&state=${params.state}`;
        }
        if (params.scope !== null) {
             // from oauth docs, multiple scopes are passed separated by spaces
            url += `&scope=${params.scope.join(' ')}`;
        }

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

    showLoginPrompt()
    {
        window.open (this.getLoginUrl(), '_blank', 'status=0,toolbar=0,height=610,width=540');
    }

    private endpoint(path: Array<string>)
    {
        return `${this.config.PROTOCOL}://${this.config.DOMAIN}/${path.join('/')}`;
    }
}
