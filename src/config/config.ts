/**
 * Configuration helper
 */
export class ConfigModule
{
    private config: any;
    private environment: string;

    constructor()
    {

    }

    getEnv()
    {
        return this.environment;
    }

    getConfig()
    {
        return this.config;
    }

    init(environment: string)
    {
        if (
            environment == null
            || ['dev', 'staging', 'prod'].indexOf(environment) === -1
        ) {
            throw new Error('Parameter "environment" is required when initializing app and must be "dev|staging|prod"');
        }

        if (environment === 'dev') {
            console.warn(`You are using the "dev" environment which is meant to be for local development only. If you are a developer use "staging" instead.`);
        }

        this.environment = environment;
        this.config = require(`../config/environment.${environment}.json`);
    }
}

export let Config = new ConfigModule();
