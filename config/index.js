const convict = require('convict');

const config = convict({
    env: {
        format: ['production', 'staging', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    url: {
        front: {
            format: String,
            default: 'http://localhost/',
            env: 'FRONT_URL',
        },
        admin: {
            format: String,
            default: 'http://localhost/admin',
            env: 'ADMIN_URL',
        },
    },
    port: {
        format: 'port',
        default: 4000,
        env: 'PORT',
    },
    db: {
        host: {
            format: String,
            default: 'db',
            env: 'POSTGRES_HOST',
        },
        user: {
            format: String,
            default: 'amnesty',
            env: 'POSTGRES_USER',
        },
        password: {
            format: String,
            default: 'amnesty',
            env: 'POSTGRES_PASSWORD',
        },
        database: {
            format: String,
            default: 'reaction-rapide',
            env: 'POSTGRES_DATABASE',
        },
        schema: {
            format: String,
            default: 'reaction-rapide',
            env: 'POSTGRES_SCHEMA'
        }
    }
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
