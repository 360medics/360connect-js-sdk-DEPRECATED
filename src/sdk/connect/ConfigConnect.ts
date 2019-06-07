import * as envs from '../../config/environment.json';

export class ConfigConnect
{
    private clientKey: string = null;

    private environnement: string;

    private apiKey: string;

    private url: string;

    constructor(params)
    {
        this.clientKey = params.clientKey;
        this.apiKey = params.apiKey;
        this.environnement = params.environnement;

        if (envs[this.environnement]) {
            if (envs[this.environnement].api && envs[this.environnement].api.PROTOCOL && envs[this.environnement].api.DOMAIN) {
                this.url = envs[this.environnement].api.PROTOCOL + "://" + envs[this.environnement].api.DOMAIN;
            } else {
                throw new Error('Config file is missing for environnement : ' + this.environnement);
            }
        }
    }
    
    public validate()
    {
        if(!(!!this.clientKey )) {
            throw new Error('Client key cannot be empty.');
        }

        if(!(!!this.environnement )) {
            throw new Error('Environnement cannot be empty.');
        }

        if(!(!!this.url )) {
            throw new Error('Environnement is not correct. Choose between dev|staging|prod.');
        }

        return true;
    }

    get getClientKey(): string
    {
        return this.clientKey;
    }

    get getUrl(): string
    {
        return this.url;
    }

    get getApiKey(): string
    {
        return this.apiKey;
    }
}
