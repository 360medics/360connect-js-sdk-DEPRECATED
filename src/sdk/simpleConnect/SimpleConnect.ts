import {ConfigSimpleConnect} from "./ConfigSimpleConnect";
import {User} from "./User";
import {LoginButtonV2} from "./LoginButton";
import * as request from 'ajax-request';
import {LogoutButtonV2} from "./LogoutButton";

export class SimpleConnect {

    private params: ConfigSimpleConnect;

    private cookieToken = '360ConnectToken';

    public user: User;

    init(params: any) {
        this.params = new ConfigSimpleConnect(params);
        this.params.validation();

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

        return this;
    }

    private displayButtonLogin() {
        this.user = new User();
        customElements.define('login-button-v2', LoginButtonV2);

        var self = this;
        document
            .getElementsByTagName('login-button-v2')
            .item(0)
            .addEventListener('click', function () {
                self.openConnection();
            }, false);
        this.deleteCookie(this.cookieToken);
    }

    private displayButtonLogout() {
        this.user = new User();
        customElements.define('logout-button-v2', LogoutButtonV2);

        var self = this;
        document
            .getElementsByTagName('logout-button-v2')
            .item(0)
            .addEventListener('click', function () {
                self.deleteToken();
            }, false);
    }

    private openConnection() {
        window.location.href = this.params.url + '/connect/autorization_form?clientId=' + this.params.idClient;
    }

    private getDataUser() {
        new Promise((resolve, reject) => {
            request({
                url: this.params.url + '/connect/user?clientId=' + this.params.idClient + '&token=' + this.getCookie(this.cookieToken),
                method: "GET",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                }
            }, (err, res, body) => {
                if(typeof err !== 'undefined' && err !== null) {
                    throw new Error('Une erreur est arrivée. Contactez un de nos administrateurs.');
                }
                if (res.statusCode === 200) {
                    this.user = Object.assign(new User(), JSON.parse(JSON.parse(body)));
                    var event = new CustomEvent('has-data-user', {'detail': 'Yo brot'});
                    document.getElementsByTagName('login-button-v2').item(0).dispatchEvent(event);
                    this.displayButtonLogout();
                } else {
                    reject(res);
                }
            })
        });
    }

    private deleteToken() {
        new Promise((resolve, reject) => {
            request({
                url: this.params.url + '/connect/user/delete-token?clientId=' + this.params.idClient + '&token=' + this.getCookie(this.cookieToken),
                method: "GET",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                }
            }, (err, res, body) => {
                if(typeof err !== 'undefined' && err !== null) {
                    throw new Error('Une erreur est arrivée. Contactez un de nos administrateurs.');
                }
                if (res.statusCode === 204) {
                    //OK
                } else {
                    reject(res);
                }
                var event = new CustomEvent('has-logout', {'detail': 'Yo brot'});
                document.getElementsByTagName('logout-button-v2').item(0).dispatchEvent(event);
                this.displayButtonLogin();
            })
        });
    }

    private setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }

    private getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }

    private deleteCookie(name: string) {
        const date = new Date();

        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
    }

}
