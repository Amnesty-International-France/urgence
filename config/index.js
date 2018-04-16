const convict = require('convict');

const config = convict({
    env: {
        format: ['production', 'staging', 'development', 'test'],
        default: '',
        env: 'NODE_ENV',
    },
    port: {
        format: 'port',
        default: 4000,
        env: 'PORT',
    }
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
