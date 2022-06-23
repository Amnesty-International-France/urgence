const path = require('path');
const { spawn } = require('node:child_process');
const process = require('process');

const rawConfig = {
    staging: {
        deployTo: '/home/ubuntu/amnesty',
        server: 'ubuntu@52.17.15.141',
        key: process.env.KEY_FILE || '${HOME}/.ssh/amnesty-staging',
    },
    production: {
        deployTo: '/home/amnesty',
        server: 'amnesty@urgent.amnesty.fr',
        key: process.env.KEY_FILE || '${HOME}/.ssh/amnesty-prod',
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
        const proc = spawn(command, args, { shell: 'bash' });

        proc.stdout.on('data', data => console.log(`${name} : ${data}`));
        proc.stdout.on('error', error => console.error(`Error - ${name}: ${error}`));
        proc.stderr.on('data', data => console.error(`${name} : ${data}`));
        proc.stderr.on('error', error => console.error(`Error - ${name}: ${error}`));
        const promise = new Promise((resolve, reject) => {
            proc.on('close', code => (code === 0 ? resolve() : reject()));
        });

        return { proc, promise };
    };

    const { promise: exitAdmin } = launch('Admin', `make`, ['build-admin']);
    const { promise: exitApi } = launch('API  ', `make`, ['build-api']);
    const { promise: exitFront } = launch('Front', `make`, ['build-front']);

    //const { promise: exitStorybook } = launch('StoryBook', `make`, ['build-storybook']);

    try {
        await Promise.all([exitAdmin, exitApi, exitFront /*exitStorybook */]);

        const ssh = ['-i', config.key, config.server];
        const version = new Date().toISOString().replaceAll(':', '-');

        console.log(`Deploying version ${version}`);

        console.log('Remote syncing new version to server');
        await launch('rsync', 'rsync', [
            '--recursive',
            '--links',
            '--perms',
            '--times',
            "--exclude='/.git'",
            "--exclude='node_modules/'",
            '-e',
            `"ssh -i ${config.key}"`,
            '.',
            `${config.server}:${config.deployTo}/releases/${version}`,
        ]).promise;

        console.log('Installing packages');
        await launch('Install', 'ssh', [
            ...ssh,
            `'echo && cd ${config.deployTo}/releases/${version} && make install-staging'`,
        ]).promise;

        console.log('===================');
        console.log('===================');

        console.log('Stopping old apps');
        await launch('Stop', 'ssh', [
            ...ssh,
            `'cd ${config.deployTo}/current && make stop-${process.env.NODE_ENV}'`,
        ]).promise;

        console.log('===================');
        console.log('===================');
        console.log('Linking new apps');
        await launch('ln', 'ssh', [
            ...ssh,
            `'cd ${config.deployTo} && echo $(pwd) && rm current && ln -s $(pwd)/releases/${version} current'`,
        ]).promise;

        console.log('===================');
        console.log('===================');
        console.log('Starting new apps');
        await launch('Start', 'ssh', [
            ...ssh,
            `'cd ${config.deployTo}/current && make start-${process.env.NODE_ENV}'`,
        ]).promise;

        console.log('===================');
        console.log('===================');
        console.log('Compressing old releases');
        await launch('Compress', 'ssh', [
            ...ssh,
            `'cd ${config.deployTo}/releases && for f in *; do if [ -d $f ] && [ "$f" != "${version}" ]; then echo Compressing $f && tar -czf $f.tar.gz $f && echo Removing $f && sudo rm -rf $f; fi; done'`,
        ]).promise;
    } catch (error) {
        console.error(`Error : ${error}`);
        process.exit(2);
    }
};
deploy();
