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
            keepReleases: 5,
            servers: 'ubuntu@52.17.15.141',
            strict: false,
        },
        production: {
            branch: 'master',
            key: path.join(__dirname, 'var/deploy-prod.key'),
            deployTo: '/home/amnesty',
            keepReleases: 5,
            servers: 'amnesty@urgent.amnesty.fr',
            strict: false,
        },
    });

    shipit.blTask('buildAdmin', async () => {
        await shipit.local(`NODE_ENV=${process.env.NODE_ENV} make build-admin`);
        await shipit.local(`cp -R ./admin/build ${shipit.workspace}/admin/`);
    });

    shipit.blTask('buildFront', async () => {
        await shipit.local(`NODE_ENV=${process.env.NODE_ENV} make build-front`);
        await shipit.local(`cp -R ./front/build ${shipit.workspace}/front/`);
    });

    shipit.blTask('buildStorybook', async () => {
        await shipit.local('make build-storybook');
        await shipit.local(`cp -R ./front/storybook-static ${shipit.workspace}/front/storybook`);
    });

    shipit.blTask('buildApi', async () => {
        await shipit.local('make build-api');
        await shipit.local(`cp -R ./api/dist ${shipit.workspace}/api/dist`);
    });

    shipit.on('fetched', async () => {
        await Promise.all([
            shipit.start('buildAdmin'),
            shipit.start('buildApi'),
            shipit.start('buildFront'),
            shipit.start('buildStorybook'),
        ]);
    });

    shipit.on('published', async () => {
        await shipit.remote('make install-staging', { cwd: shipit.releasePath });
        switch (process.env.NODE_ENV) {
            case 'staging':
                return shipit.remote('make stop-staging start-staging', {
                    cwd: shipit.releasePath,
                });
            case 'production':
                return shipit.remote('make stop-prod start-prod', { cwd: shipit.releasePath });
            default:
                return;
        }
    });
};
