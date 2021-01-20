const fetch = require('node-fetch');
const qs = require('qs');

const {MoleculerError} = require("moleculer").Errors;

const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true, // switch to true if you're making a lot of calls from this client
});

module.exports = {
    name: 'magento.rest',
    actions: {
        PUT: {
            handler: async function ({params: {url, data, token, params}}) {
                return await this.request({url, method: "PUT", data, token, params})
            }
        },
        GET: {
            handler: async function ({params: {url, params, token}}) {
                return await this.request({url, method: "GET", params, token});
            }
        },
        POST: {
            handler: async function ({params: {url, data, token, params}}) {
                return await this.request({url, method: "POST", data, token, params})
            }
        },
        DELETE: {
            handler: async function ({params: {url, data, token, params}}) {
                return await this.request({url, method: "DELETE", data, token, params})
            }
        },
        PATCH: {
            handler: async function ({params: {url, data, token, params}}) {
                return await this.request({url, method: "PATCH", data, token, params})
            }
        }
    },
    methods:
        {
            request: async ({url, method, data, token, params = {}}) => {

                const headers = {
                    'Authorization': 'Bearer ' + token
                }

                let _params = '';
                if (Object.keys(params).length > 0) {
                    const urlParams = qs.stringify(params);
                    _params = '?' + urlParams.toString();
                }

                const result = await fetch(url + _params, {
                    method,
                    headers: {'Content-Type': 'application/json', ...headers},
                    body: data ? JSON.stringify(data) : null,
                    agent: httpsAgent,
                })

                const raw = await result.text();
                let body = '';

                try {
                    body = JSON.parse(raw);
                } catch (e) {
                    body = raw;
                }

                if (result.status >= 400 ) {
                    throw new MoleculerError(body.message, result.status, "MAGENTO_ERROR", body.trace)
                } else {
                    return {
                        status: result.status,
                        body
                    };
                }


            }
        }

}