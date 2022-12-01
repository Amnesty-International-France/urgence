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
            doc:
                'All API routes are served under `/api` prefix in all environments, except in dev where it is served from root.',
        },
        metadata: {
            format: String,
            default: '/metadata',
            env: 'API_METADATA_URL',
            doc:
                'All metadata routes are served under `/metadata` prefix in all environments, except in dev where it is served from root.',
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
                format: String,
                default: '0',
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
        ssl: {
            rejectUnauthorized: false,
            checkServerIdentity: false,
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
            service: {
                format: String,
                default: 'smtp',
                env: 'SMTP_SERVICE',
            },
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
                pass: {
                    format: String,
                    default: '',
                    env: 'SMTP_PASSWORD',
                },
            },
        },
    },
    salesforce: {
        baseUrl: {
            format: String,
            default: '',
            env: 'SF_BASE_URL',
        },
        version: {
            format: String,
            default: 'v45.0',
            env: 'SF_API_VERSION',
        },
        consumerKey: {
            format: String,
            default: '',
            env: 'SF_CONSUMER_KEY',
        },
        consumerSecret: {
            format: String,
            default: '',
            env: 'SF_CONSUMER_SECRET',
        },
        username: {
            format: String,
            default: '',
            env: 'SF_USERNAME',
        },
        password: {
            format: String,
            default: '',
            env: 'SF_PASSWORD',
        },
        securityToken: {
            format: String,
            default: '',
            env: 'SF_SECURITY_TOKEN',
        },
    },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
