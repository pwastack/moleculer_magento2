const ApiService = require("moleculer-web");
const auth = require('../utils/auth')

module.exports = {
    name: 'api.gateway',
    mixins: [ApiService],
    hooks: {
        before: { '*' : auth }
    },
    settings: {
        routes: [{
            bodyParsers: {
                json: {limit: '100mb'}
            },
            aliases: {
                "REST storefront/event": "webhook.storefront.event"
            }
        }]

    }
}