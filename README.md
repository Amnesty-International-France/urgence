# Reaction Rapide

## Setup

Grab project dependencies, and your launch Docker containers:

```sh
make install start
```

You can now access different applications:

-   API: http://localhost:4000
-   Admin: http://localhost:5000
-   Front app: http://localhost:3000

If you run the project in development, you can use:

-   Storybook: http://localhost:9009

## Deployment

Deployment on staging is done through the command:

```sh
make deploy-staging
```

By default, it deploys `master` branch. However, it is possible to deploy another branch by setting a `BRANCH` environment variable. For instance:

```sh
BRANCH=feature make deploy-staging
```

## Certificates

Certificates are managed on staging by [certbot](https://github.com/certbot/certbot). The `certbot-auto` script is at the root level of the staging server.

Certificates should be renewed automatically with cron

To renew the certificate, you should:

1. Stop the running server: `cd amnesty/current && make stop-staging`
2. Run the renew command `sudo certbot renew`
3. Restart the server: `cd amnesty/current && make start-staging`

## Debugging E2E tests

E2E tests output can be visible via VNC:

```sh
make selenium-debug
```

Then, connect via your favorite VNC client to `localhost:5900` (password is `secret`). When launching the `make debug-e2e` again, output should be visible.
