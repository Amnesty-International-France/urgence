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

    shipit.blTask('install', async () => {
        await shipit.remote('bash -ci "make install-prod"', {
            cwd: `${BASE_FOLDER}/current/`,
        });
    });

    shipit.blTask('migrate', async () => {
        await shipit.remote(`bash -ci "mkdir -p ${BASE_FOLDER}data"`);
        await shipit.remote('bash -ci "make migration-prod"', {
            cwd: `${BASE_FOLDER}/current/`,
        });
    });

    shipit.blTask('start', async () => {
        await shipit.remote('bash -ci "make stop-prod start-prod"', {
            cwd: `${BASE_FOLDER}/current/`,
        });
    });

    shipit.on('deployed', async () => {
        await shipit.start('install');
        await shipit.start('migrate');
        await shipit.start('start');
    });
}
