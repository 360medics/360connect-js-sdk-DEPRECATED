import {ConfigConnect} from "./ConfigConnect";
import {User} from "./User";
import {LoginButton} from "./LoginButton";
import * as request from 'ajax-request';
import {LogoutButton} from "./LogoutButton";

export class Connect
{

    public user: User;
    private params: ConfigConnect;
    private cookieToken = '360ConnectToken';

    private _onLogin: any;
    private _onLogout: any;
    private _onInit: any;
    private _onLoginBtnRender: any;
    private _onLogoutBtnRender: any;
    private _onError: any;

    init(params: any)
    {
        this.initFunctions(params);
        if (!!this._onInit) {
            this._onInit();
        }

        if (!!this.getCookie('api_key')) {
            params.apiKey = this.getCookie('api_key');
        }

        this.params = new ConfigConnect(params);
        this.params.validate();

        this.load();

        return this;
    }

    onInit(fn: Function)
    {
        this._onInit = fn;
        return this;
    }

    onLogin(fn: Function)
    {
        this._onLogin = fn;
        return this;
    }

    onLogout(fn: Function)
    {
        this._onLogout = fn;
        return this;
    }

    onLoginBtnRender(fn: Function)
    {
        this._onLoginBtnRender = fn;
        return this;
    }

    onLogoutBtnRender(fn: Function)
    {
        this._onLogoutBtnRender = fn;
        return this;
    }

    onError(fn: Function)
    {
        this._onError = fn;
        return this;
    }

    private load()
    {
        //Déjà connecté et on a les infos de l'utilisateur
        if (!!this.getCookie(this.cookieToken) && !!this.user && this.user.isValid()) {
            this.displayButtonLogout();
        } else if (!!this.getCookie(this.cookieToken)) {
            //Connecté mais pas les infos
            this.getDataUser();
        } else {
            const url = new URL(window.location.href);
            const token = url.searchParams.get('token');
            if (!!token) {
                this.setCookie(this.cookieToken, token);
                this.getDataUser();
            } else {
                this.displayButtonLogin();
            }
        }
    }

    private initFunctions(params: any)
    {
        if (!!!this._onInit) {
            this._onInit = params.onInit;
        }
        if (!!!this._onLogin) {
            this._onLogin = params.onLogin;
        }
        if (!!!this._onLogout) {
            this._onLogout = params.onLogout;
        }
        if (!!!this._onLoginBtnRender) {
            this._onLoginBtnRender = params.onLoginBtnRender;
        }
        if (!!!this._onLogoutBtnRender) {
            this._onLogoutBtnRender = params.onLogoutBtnRender;
        }
        if (!!!this._onError) {
            this._onError = params.onError;
        }
    }

    private displayButtonLogin()
    {
        this.user = new User();
        customElements.define('login-button', LoginButton);

        var self = this;
        document
            .getElementsByTagName('login-button')
            .item(0)
            .addEventListener('click', function () {
                self.openConnection();
            }, false);
        this.deleteCookie(this.cookieToken);

        if (!!this._onLoginBtnRender) {
            this._onLoginBtnRender();
        }
    }

    private displayButtonLogout()
    {
        if (document.getElementsByTagName('logout-button').length > 0) {

            this.user = new User();
            customElements.define('logout-button', LogoutButton);

            var self = this;
            document
                .getElementsByTagName('logout-button')
                .item(0)
                .addEventListener('click', function () {
                    self.deleteToken();
                }, false);

            if (!!this._onLogoutBtnRender) {
                this._onLogoutBtnRender();
            }
        }
    }

    private openConnection()
    {
        let url = this.params.getUrl + '/connect/autorization_form?clientKey=' + this.params.getClientKey;

        if (!!this.params.getApiKey) {
            url += '&api_key=' + this.params.getApiKey;
        }

        window.location.href = url;
    }

    private getDataUser()
    {
        new Promise((resolve, reject) => {
            request({
                url: this.params.getUrl + '/connect/user?clientKey=' + this.params.getClientKey + '&token=' + this.getCookie(this.cookieToken),
                method: "GET",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                }
            }, (err, res, body) => {
                if (typeof err !== 'undefined' && err !== null) {
                    throw new Error('An error occurred when you get data user. Contact someone from 360 medics.');
                }
                if (res.statusCode === 200) {
                    try {
                        this.user = Object.assign(new User(), JSON.parse(JSON.parse(body)));
                        if (!!this._onLogin) {
                            this._onLogin(this.user);
                        }
                        this.displayButtonLogout();
                    } catch (e) {
                        if (!!this._onError) {
                            this._onError(e);
                        }
                        this.deleteCookie(this.cookieToken);
                        window.location.href = window.location.href.split("?")[0];
                        window.location.reload(true);
                    }
                } else {
                    if (!!this._onError) {
                        this._onError(res);
                    }
                    this.deleteCookie(this.cookieToken);
                    window.location.href = window.location.href.split("?")[0];
                    window.location.reload(true);
                }
            })
        });
    }

    private deleteToken()
    {
        new Promise((resolve, reject) => {
            request({
                url: this.params.getUrl + '/connect/user/delete-token?clientKey=' + this.params.getClientKey + '&token=' + this.getCookie(this.cookieToken),
                method: "GET",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            }, (err, res, body) => {
                if (typeof err !== 'undefined' && err !== null) {
                    throw new Error('An error occurred when you delete autorization for an user. Contact someone from 360 medics.');
                }
                if (res.statusCode === 204) {
                    if (!!this._onLogout) {
                        this._onLogout();
                    }
                } else {
                    reject(res);
                    if (!!this._onError) {
                        this._onError(res);
                    }
                }
                this.displayButtonLogin();
            })
        });
    }

    private setCookie(name: string, val: string)
    {
        localStorage.setItem(name, val);
    }

    private getCookie(name: string)
    {
        return localStorage.getItem(name);
    }

    private deleteCookie(name: string)
    {
        localStorage.removeItem(name);
    }

}
