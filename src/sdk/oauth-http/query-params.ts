/**
 * Get, find, handles GET query parameters or hash params.
 */
export class QueryParamsModule
{
    private queryParams: any = {};
    private hashQueryParams: any = {};

    constructor()
    {
        if (window.location.search) {
            const uriString = location.search.replace('?', ''); // remove the "?"
            this.queryParams = this.extractParams(uriString);
        }

        if (window.location.hash) {
            const uriString = location.hash.replace('#', ''); // remove the "#"
            this.hashQueryParams = this.extractParams(uriString);
        }
    }

    private extractParams(stringUri: string)
    {
        let params: any = {};
        const queryParts = stringUri.split('&');

        for (let part of queryParts) {
            let pair = part.split('=');

            if (pair.length === 2) {
                params[pair[0]] = pair[1];
            }
        }

        return params;
    }
    
    getQueryParams()
    {
        return this.queryParams;
    }

    getQueryParam(name: string)
    {
        return (typeof this.queryParams[name] === 'undefined') ? null : this.queryParams[name];
    }

    getHashQueryParams(): any
    {
        return this.hashQueryParams;
    }

    getHashQueryParam(name: string): any
    {
        return (typeof this.hashQueryParams[name] === 'undefined') ? null : this.hashQueryParams[name];
    }
}

export let QueryParams = new QueryParamsModule();
