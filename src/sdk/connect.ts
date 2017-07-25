import { OAuth }        from '../sdk';
import { QueryParams }  from '../sdk/oauth-http';

/**
 * Main wrapper 360 connect class.
 */
export class Connect
{
    private oauth: OAuth;

    constructor()
    {
        this.oauth = new OAuth();
    }

    QueryParams()
    {
        return QueryParams;
    }

    OAuth()
    {
        return this.oauth;
    }
}
