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

## Documentation

The project is partly documented.

This documentation is written in `markdown` and can be found in the `documentation` directory.

This documentation can be displayed via the [incaya-documentation](https://codeberg.org/INCAYA/incaya-documentation) project  using the following recipes:

```bash
# Start documentation
$ make doc-start
# Stop documentation
$ make doc-stop
# Create a new content
$ make doc-new-content
```

Once the `make start` recipe has been launched, you have access to :

- the documentation site : http://localhost:1500/
- an instance of Excalidraw if you need to create illustrations : http://localhost:1501/


## Deployment

### Prod

Deployment on prod is done by creating a [tag](https://gitlab.com/amnesty-fr/amnesty-urgent/-/tags) from the `master` branch, e.g. `v1.0.0`

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
