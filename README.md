# Reaction Rapide

## Setup

Grab project dependencies, and your launch Docker containers:

```sh
make install start
```

You can now access different applications:

*   API: https://localhost:4000/
*   Admin: https://localhost:5000/
*   Front app: https://localhost:3000/

## Deployment

Deployment on staging is done through the command:

```sh
make deploy-staging
```

By default, it deploys `master` branch. However, it is possible to deploy another branch by setting a `BRANCH` environment variable. For instance:

```sh
BRANCH=feature deploy-staging
```

## Debugging E2E tests

E2E tests output can be visible via VNC:

```sh
make selenium-debug
```

Then, connect via your favorite VNC client to `localhost:5900` (password is `secret`). When launching the `make debug-e2e` again, output should be visible.
