# Google AppEngine Adadgio Project

## Development

First `cd` to the top folder directory `cd ./adadgio-gcloud`.

**Run Typecript compiler**

```bash
npm run watch
```

If you change configuration files (like `./config/parameters.dev.json` or `app|cron|*.yaml`), you need to run `npm run watch` again (it copies necessary assets under the hood into the `./dist/*` directory).

If more assets need to be copied to specific `./dist` location, edit the `build.sh` file at project root directory.

**Reduce Google Cloud Platform billing**

Read this [blog post](https://medium.com/google-cloud/three-simple-steps-to-save-costs-when-prototyping-with-app-engine-flexible-environment-104fc6736495) from Sandeep Dinesh

## Deploy to app engine

```bash
npm run deploy
```

This will run `tsc`, copy assets and deploy to the cloud console.

## Configurations

firebase: `firebase use <default|dev|staging|prod>`

gcloud: `gcloud config configurations activate <default|dev|staging|prod>`

Other usefull gcloud commands

- List all configurations: `gcloud config configurations list`
- List config parameters for current configuration:  `gcloud config list`
