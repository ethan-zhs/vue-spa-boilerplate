// https
const HTTP = 'http://';
const HTTPS = 'https://';

// domain
const DOMAIN_TEST = `${HTTP}192.168.31.73:8080`;
const DOMAIN_PROD = `${HTTP}192.168.31.74:8080`;

const baseName = {
    localhost: DOMAIN_TEST,
    'test-domain.com': DOMAIN_TEST,
    'prod-domain.com': DOMAIN_PROD
};

const apiBaseName = baseName[window.location.hostname];

export const getApiBaseName = {
    api: apiBaseName + '/api/'
};