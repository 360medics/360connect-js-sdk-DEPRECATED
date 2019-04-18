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

    init(params: any)
    {
        this.params = new ConfigConnect(params);
        this.params.validate();

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
        }
    }

    private openConnection()
    {
        window.location.href = this.params.getUrl + '/connect/autorization_form?clientKey=' + this.params.getClientKey;
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
                    this.user = Object.assign(new User(), JSON.parse(JSON.parse(body)));
                    var event = new CustomEvent('has-data-user', {'detail': this.user});
                    document.getElementsByTagName('login-button').item(0).dispatchEvent(event);
                    this.displayButtonLogout();
                } else {
                    reject(res);
                    this.displayButtonLogin();
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
                    //OK
                } else {
                    reject(res);
                }
                var event = new CustomEvent('has-logout', {'detail': 'Yo brot'});
                document.getElementsByTagName('logout-button').item(0).dispatchEvent(event);
                this.displayButtonLogin();
            })
        });
    }

    private setCookie(name: string, val: string)
    {
        /*const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";*/
        localStorage.setItem(name, val);
    }

    private getCookie(name: string)
    {

        return localStorage.getItem(name);

        /*const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }*/
    }

    private deleteCookie(name: string)
    {
        /*const date = new Date();

        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";*/
        localStorage.removeItem(name);
    }

}
