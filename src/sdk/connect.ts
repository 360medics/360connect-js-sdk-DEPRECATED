import { OAuth } from '../sdk';

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

    OAuth()
    {
        return this.oauth;
    }
}
