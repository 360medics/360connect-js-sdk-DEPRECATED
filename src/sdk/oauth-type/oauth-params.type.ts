export type OAuthClientInitConfig = {
    clientId: string;
    environment: 'dev'|'staging'|'prod';
    clientSecret?: string;
};

export type OAuthParameters = {
    redirectUri: string;
    scope: string;
    state?: string;
    username?: string;
    password?: string;
    grant_type?: 'password'|'client_credentials'|'token'|'authorization_code';
    userApiKey?: string;
    [prop: string]: string|number;
};
