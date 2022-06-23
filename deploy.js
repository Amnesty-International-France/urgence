const path = require('path');
const { spawn } = require('node:child_process');
const process = require('process');

const rawConfig = {
    staging: {
        deployTo: '/home/ubuntu/amnesty',
        server: 'ubuntu@52.17.15.141',
        key: process.env.KEY_FILE || '~/.ssh/amnesty-staging',
    },
    production: {
        deployTo: '/home/amnesty',
        server: 'amnesty@urgent.amnesty.fr',
        key: process.env.KEY_FILE || '~/.ssh/amnesty-staging',
    },
};

const config = rawConfig[process.env.NODE_ENV];

if (!config) {
    console.error(`No config found for ${process.env.NODE_ENV}`);
    process.exit(1);
}

const deploy = async () => {
    console.log('Running builds ...');

    const launch = (name, command, args) => {
        const proc = spawn(command, args, { env: process.env });

        proc.stdout.on('data', data => console.log(`${name}: ${data}`));
        proc.stdout.on('error', error => console.error(`Error - ${name}: ${error}`));
        proc.stderr.on('data', data => console.error(`${name}: ${data}`));
        proc.stderr.on('error', error => console.error(`Error - ${name}: ${error}`));
        const promise = new Promise((resolve, reject) => {
            proc.on('close', code => (code === 0 ? resolve() : reject()));
        });

        return { proc, promise };
    };

    const { promise: exitAdmin } = launch('Admin', `make`, ['build-admin']);
    const { promise: exitApi } = launch('API', `make`, ['build-api']);
    const { promise: exitFront } = launch('Front', `make`, ['build-front']);
    const { promise: exitStorybook } = launch('StoryBook', `make`, ['build-storybook']);

    try {
        await Promise.all([exitAdmin, exitApi, exitFront, exitStorybook]);

        const sshToBash = ['-i', config.server, config.key, 'bash', '-c'];
        const version = new Date().toISOString();

        console.log(`Deploying version ${version}`);

        console.log('Deploying new version to server');
        await launch('Deploy', 'rsync', [
            '.',
            `${config.server}/${config.deployTo}/releases/${version}]`,
        ]).promise;

        console.log('Installing packages');
        await launch('Install', 'ssh', [
            ...sshToBash,
            `"cd ${config.deployTo}/releases/${version} && make install-staging"`,
        ]).promise;

        console.log('Stopping old apps');
        await launch('Stop old server', 'ssh', [
            ...sshToBash,
            `"cd ${config.deployTo}/current && make stop-${process.env.NODE_ENV}"`,
        ]).promise;

        console.log('Linking new apps');
        await launch('ln', 'ssh', [
            ...sshToBash,
            `"cd ${config.deployTo} && rm current && ln -s release/${version} current"`,
        ]).promise;

        console.log('Starting new apps');
        await launch('Start', 'ssh', [
            ...sshToBash,
            `"cd ${config.deployTo}/current && make start-${process.env.NODE_ENV}"`,
        ]).promise;

        await launch('Compress old releases', 'ssh', [
            ...sshToBash,
            `"cd ${config.deployTo}/releases && for f in *; do if [ -d $f ]; then tar -czf $f.tar.gz $f; fi; done"`,
        ]).promise;
    } catch (error) {
        console.error(error);
        process.exit(2);
    }
};
deploy();
