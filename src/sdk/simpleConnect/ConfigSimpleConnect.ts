import * as envs from '../../config/environment.json';

export class ConfigSimpleConnect {

    private _idClient: string;

    private _environnement: string;

    private _url: string;

    constructor(_params) {
        this._idClient = _params.idClient;
        this._environnement = _params.environnement;
        if (envs[this._environnement]) {
            if (envs[this._environnement].api && envs[this._environnement].api.PROTOCOL && envs[this._environnement].api.DOMAIN) {
                this._url = envs[this._environnement].api.PROTOCOL + "://" + envs[this._environnement].api.DOMAIN;
            } else {
                throw new Error("Il manque le fichier JSON de config");
            }
        }
    }

    public validation() {
        if (!(!!this._idClient && !!this._environnement && !!this._url)) {
            throw new Error("Votre id et l'environnement désiré (dev|staging|prod) doivent être renseignés");
        }
        return true;
    }

    get idClient(): string {
        return this._idClient;
    }

    get environnement(): string {
        return this._environnement;
    }

    get url(): string {
        return this._url;
    }
}
