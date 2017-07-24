export class ErrorResponse
{
    error?: string;
    error_uri?: string;
    error_description?: string;

    constructor(data: any)
    {
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
    }
    
    has(prop: string)
    {
        return this[prop] !== 'undefined' ? true : false;
    }

    isSuccessful()
    {
        return (this.error == null) ? true : false;
    }
}

export class TokenResponse extends ErrorResponse
{
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;

    constructor(data: any)
    {
        super(data);
    }
}

export class AuthorizationResponse extends ErrorResponse
{
    code: string;
    state?: string;

    constructor(data: any)
    {
        super(data);
    }
}
