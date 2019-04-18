import * as envs from '../../config/environment.json';

export class ConfigSimpleConnectSingleton
{
    private _idClient: string = null;

    private _environnement: string;

    private _url: string;

    constructor(params)
    {
        this.idClient = params.idClient;
        this.environnement = params.environnement;

        if (envs[this._environnement]) {
            if (envs[this._environnement].api && envs[this._environnement].api.PROTOCOL && envs[this._environnement].api.DOMAIN) {
                this._url = envs[this._environnement].api.PROTOCOL + "://" + envs[this._environnement].api.DOMAIN;
            } else {
                throw new Error("Il manque le fichier JSON de config");
            }
        }
    }
    
    public validation()
    {
        // @TODO: séparer les msg pour plus clair
        if (!(!!this._idClient && !!this._environnement && !!this._url)) {
            throw new Error("Cientn ID cannot bee eempty Votre C et l'environnement désiré (dev|staging|prod) doivent être renseignés");
        }
        return true;
    }

    get idClient(): string
    {
        return this._idClient;
    }

    get environnement(): string
    {
        return this._environnement;
    }

    get url(): string
    {
        return this._url;
    }
}

export let ConfigSimpleConnect = new ConfigSimpleConnectSingleton()
