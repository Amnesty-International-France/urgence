const path = require('path');

const BASE_FOLDER = '/home/ubuntu/amnesty';

module.exports = shipit => {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            repositoryUrl: 'git@github.com:marmelab/amnesty-reaction-rapide.git',
        },
        staging: {
            branch: process.env.BRANCH || 'master',
            key: path.join(__dirname, 'var/deploy.key'),
            deployTo: BASE_FOLDER,
            servers: 'ubuntu@52.17.15.141',
        },
    });

    shipit.blTask('buildAdmin', async () => {
        await shipit.local('make build-admin-staging');
        await shipit.local(`cp -R ./admin/build ${shipit.workspace}/admin/`);
    });

    shipit.on('fetched', async () => {
        await shipit.start('buildAdmin');
    });

    shipit.on('published', async () => {
        await shipit.remote('make install-staging', { cwd: shipit.releasePath });
        await shipit.remote('make stop-staging start-staging', { cwd: shipit.releasePath });
    });

    // shipit.task('admin', async () => {
    //
    // });

    // shipit.blTask('install', async () => {
    //     await shipit.remote('bash -ci "make install-staging"', {
    //         cwd: `${BASE_FOLDER}/current/`,
    //     });
    // });

    // shipit.blTask('migrate', async () => {
    //     await shipit.remote(`bash -ci "mkdir -p ${BASE_FOLDER}data"`);
    //     await shipit.remote('bash -ci "make migration-staging"', {
    //         cwd: `${BASE_FOLDER}/current/`,
    //     });
    // });

    // shipit.blTask('start', async () => {
    //     await shipit.remote('bash -ci "make stop-staging start-staging"', {
    //         cwd: `${BASE_FOLDER}/current/`,
    //     });
    // });

    // shipit.on('deployed', async () => {
    //     await shipit.start('install');
    //     await shipit.start('migrate');
    //     await shipit.start('start');
    // });
}

