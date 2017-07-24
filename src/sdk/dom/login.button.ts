import { Config, Local } from '../../sdk';
// import * as LogoSvg from '../../assets/ripple.svg';
// import txt from 'raw-loader!./../../assets/ripple-data-uri.txt';

/**
 * Custom HTML element button.
 */
export class LoginButton extends HTMLElement
{
    private loaderDataUri: string;

    // monitor the "user" attribute for changes.
    static get observedAttributes() {return ['username']; }

    constructor() {
        super();

        const config = Config.getConfig()['api'];
        const domain = `${config.PROTOCOL}://${config.DOMAIN}`;
        const data = Local.retrieve('loginStatus');
        const user = (data === null) ? null : data.user;

        let imgSrc = this.logoUri();
        let btnText = '360 Connect';

        if (user !== null) {
            imgSrc = `${domain}${user.avatar}`;
            btnText = user.surname;
        }

        this.loaderDataUri = require('../../assets/ripple-data-uri.txt');

        // slot is a placeholder for user custom text inside the custom element markup
        // slot can also be replaced by text using "this.textContent"
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${this.cssStyles()}</style>
            <div class="connect-btn">
                <div class="inner">
                    <span class="logo">
                        <img src="${imgSrc}" height="23" width="23" />
                    </span>
                <span class="text"><slot>${btnText}</slot></span>
                </div>
            </div>
        `;

        // this relies/depends uniquely on HTML markup above
        let imgNode: any = shadowRoot.childNodes[2].childNodes[1].childNodes[1].childNodes[1];

        window.addEventListener('status:change', (e: CustomEvent) => {
            // e.detail.status is "login|loading"
            this.updateButton(e.detail.status, e.detail.user, imgNode);
        });
        
        this.addEventListener('click', e => {
            this.onClick(e);
        });
    }

    get username()
    {
        return this.getAttribute('username');
    }

    set username(username: any)
    {
        this.setAttribute('username', username);
    }

    // called whenever the custom element is removed from the DOM.
    connectedCallback() {
        // const data = Local.retrieve('getLoginStatus');
        // const user = (data === null) ? null : data.user;
        // this.textContent = (user === null) ? '360 Connect' : `Bonjour ${user.surname}`;

    }

    // called whenever an attribute is added, removed or updated
    // only attributes listed in the observedAttributes property are affected.
    attributeChangedCallback(attr, oldValue, newValue)
    {
        // if (attr === 'username') {
        //     // console.log(newValue);
        //     this.textContent = `Bonjour ${newValue}`;
        // }
        // console.log(this.childNodes[2].childNodes[1].childNodes[1].childNodes[1]);
    }

    updateButton(status: string, user: any, imgNode)
    {
        const config = Config.getConfig()['api'];
        const domain = `${config.PROTOCOL}://${config.DOMAIN}`;

        if (status === 'loading') {
            imgNode.src = this.loaderDataUri;
        } else {
            if (user === null) {
                this.textContent = '360 Connect';
                imgNode.src = this.logoUri();
            } else {
                this.textContent = user.surname;
                imgNode.src = `${domain}${user.avatar}`;
            }
        }
    }

    onClick(e: any)
    {

    }

    changeAppearance()
    {
        console.log("Changin' that!")
    }

    cssStyles()
    {
        return `
            :host {
                display: flex;
            }

            :host > .connect-btn {
                display: flex;
                flex-direction: column;

                cursor: pointer;
                color: #f1f1f1;
                font-size: 16px;
                line-height: 1em;
                letter-spacing: .25px;
                font-family: Helevetica, Arial, sans-serif;
                background-color: #CC2B18;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;

                border-radius: 4px;
                -moz-border-radius: 4px;
                -webkit-border-radius: 4px;
            }

            :host > .connect-btn > .inner {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 6px 12px 6px 6px;
            }

            :host > .connect-btn > .inner > span {

            }
            :host > .connect-btn  > .inner > span.logo {
                background: #fff;
                padding: 3px 3px 1px 3px;
                border-radius: 2px;
                -moz-border-radius: 2px;
                -webkit-border-radius: 2px;
                margin-right: 8px;
            }
            :host > .connect-btn  > .inner > span.text {

            }
        `;
    }

    logoUri()
    {
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRjk2QUU3RDU4NUQxMUU0QjAwREFEQTk2QkFDNDlFOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRjk2QUU3RTU4NUQxMUU0QjAwREFEQTk2QkFDNDlFOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGOTZBRTdCNTg1RDExRTRCMDBEQURBOTZCQUM0OUU5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGOTZBRTdDNTg1RDExRTRCMDBEQURBOTZCQUM0OUU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Fk4zYwAAK71JREFUeNrsfQec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
        `;
    }
}
