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

### Prod

Deployment on prod is done by creating a tag, e.g. `v1.0.0`

URLs:
- admin : https://urgent.amnesty.fr/admin/
- front : https://urgent.amnesty.fr
- API : https://rapide.amnesty.fr/graphql

### Release

Deployment is done automatically after the `develop` branch has been updated.

URLs:
- admin : https://release.urgent.amnesty.fr/admin/
- front : https://release.urgent.amnesty.fr/
- API : https://release.rapide.amnesty.fr/graphql

## Debugging E2E tests

E2E tests output can be visible via VNC:

```sh
make selenium-debug
```

Then, connect via your favorite VNC client to `localhost:5900` (password is `secret`). When launching the `make debug-e2e` again, output should be visible.
