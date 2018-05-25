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
    api: {
        prefixUrl: {
            format: String,
            default: '/api',
            env: 'API_PREFIX_URL',
        },
    },
    port: {
        format: 'port',
        default: 4000,
        env: 'PORT',
    },
    cors: {
        allowedOrigin: {
            doc: 'CORS allowed origins',
            format: 'String',
            default: '*',
            env: 'CORS_ALLOWED_ORIGIN',
        },
    },
    admin: {
        authentication: {
            username: {
                format: String,
                default: '',
                env: 'ADMIN_USERNAME',
            },
            password: {
                format: String,
                default: '',
                env: 'ADMIN_PASSWORD',
            },
            jwtSecret: {
                doc: 'Secret key used to generate the JSON Web tokens',
                format: 'String',
                default: 0,
                env: 'JWT_SECRET_KEY',
            },
            sessionDuration: {
                doc: 'How many time a token is valid (in hours)',
                format: 'int',
                default: 6,
            },
        },
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
            env: 'POSTGRES_SCHEMA',
        },
    },
    uploadDir: {
        format: String,
        default: '/app/var/uploads',
        env: 'UPLOAD_DIR',
    },
    uploadUrl: {
        format: String,
        default: 'http://localhost',
        env: 'UPLOAD_URL',
    },
    mailer: {
        emitter: {
            format: String,
            default: 'webmestre@amnesty.fr',
            env: 'MAIL_EMITTER',
        },
        smtp: {
            host: {
                format: String,
                default: 'smtp.mailgun.org',
                env: 'SMTP_HOST',
            },
            port: {
                format: 'int',
                default: 465,
                env: 'SMTP_PORT',
            },
            ignoreTLS: {
                format: Boolean,
                default: false,
                env: 'SMTP_IGNORE_TLS',
            },
            auth: {
                user: {
                    format: String,
                    default: 'postmaster',
                    env: 'SMTP_USER',
                },
                password: {
                    format: String,
                    default: '',
                    env: 'SMTP_PASSWORD',
                },
            },
        },
    },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
