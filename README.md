# Reaction Rapide

## Setup

Installing the project requires to setup some environment secrets. Update your `~/.bashrc` file with the following:

```sh
export POSTGRES_PASSWORD=password
```

**Note:** previous parameters are the `development` one. You'll need to update it on other environments.

Once your profile file is updated, reload it, grab project dependencies, and your launch Docker containers:

```sh
source ~/.bashrc
make install start
```

API should now be available on `https://localhost:4000/`.
