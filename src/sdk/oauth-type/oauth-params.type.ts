export type OAuthClientInitConfig = {
    flow: string;
    clientId: string;
    environment: 'dev'|'staging'|'prod';
    clientSecret?: string;
    package?: string;
    version?: string;
    profile_licence?: string;
};

export type OAuthParameters = {
    redirectUri: string;
    scope?: string;
    state?: string;
    username?: string;
    password?: string;
    grant_type?: 'password'|'client_credentials'|'token'|'authorization_code';
    userApiKey?: string;
    profile_licence?: string;
    [prop: string]: string|number;
};
