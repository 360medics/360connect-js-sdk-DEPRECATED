import * as mixpanel from 'mixpanel-browser';
import { OAuth, Config }            from '../sdk';
import { QueryParams }              from '../sdk/oauth-http';
import { OAuthClientInitConfig }    from '../sdk/oauth-type';

/**
 * Main wrapper 360 connect class.
 */
export class Connect
{
    protected oauth: OAuth;
    protected trackingEnabled: boolean = false;
    protected mixpanelConfig: any;

    // for tracking anx mixpanel who does what
    protected package: string = null;
    protected version: string = null;

    IMPLICIT_FLOW: string = null;
    PASSWORD_FLOW: string = null;
    CLIENT_CREDENTIALS_FLOW: string = null;
    AUTHORIZATION_FLOW: string = null;

    initialize(clientConfig: OAuthClientInitConfig)
    {
        Config.init(clientConfig.environment);
        this.mixpanelConfig = Config.getConfig()['mixpanel'];
        
        this.oauth = new OAuth();
        this.oauth.initialize(clientConfig);

        this.package = clientConfig.package || null;
        this.version = clientConfig.version || null;

        return this;
    }

    QueryParams()
    {
        return QueryParams;
    }

    OAuth()
    {
        return this.oauth;
    }

    enableTracking()
    {
        const reg = /^[a-z]{3}\.[a-z]+\.[a-z]+$/;
        const reg2 = /^[0-9]{1}\.[0-9]{1}\.[0-9]{0,1}$/;

        if (reg.test(this.package) !== true || reg2.test(this.version) !== true) {
            // @todo Check that package name is a valid package name like "com.myapp.vendor"
            throw new Error(`@360connect: analytics tracking API requires a valid package name like "com.myapp.vendor" and a valid version number "x.x.x" or "x.x"`);
        }

        if (typeof this.mixpanelConfig['token'] === 'undefined' || this.mixpanelConfig['token'] == null) {
            this.trackingEnabled = false;
        } else {
            this.trackingEnabled = true;
            mixpanel.init(this.mixpanelConfig['token']);
        }
    }

    track(eventName: string, eventData: any = {})
    {
        // a few safeguards
        if (this.oauth.getUser() === null || parseInt(this.oauth.getUser().id) === 0) {
            throw new Error(`@360connect: tracking an event failed because not user id was provided\nYou should consider tracking events after successfull login`);
        }
        if (false === this.trackingEnabled) {
            console.warn(`@360connect: Tracking is disabled by default. You should explicitely use Connect.enableTracking()`)
            return;
        }

        eventName = `webapp.${eventName}`;
        eventData.uid = parseInt(this.oauth.getUser().id);
        eventData.version = (this.version === null) ? 'unkown' : this.version;
        eventData.package = this.package;

        if (typeof eventData.barrel !== 'object') {
            eventData.barrels = [];
        }

        eventData.barrels.push('webapp');
        eventData.barrels.push('360connect-js-sdk');

        mixpanel.track(eventName, eventData);
    }
}
