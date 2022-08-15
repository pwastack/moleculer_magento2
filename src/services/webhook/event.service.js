
module.exports = {
    name: "webhook.storefront.event",

    actions: {
        list: {
            handler: function(ctx) {
                ctx.broker.emit('storefront.list',ctx.params);
            }
        },
        get: {
            handler: function (ctx) {
                ctx.broker.emit('storefront.get',ctx.params);
            }
        },
        create: {
            handler: function({broker,params}) {
                broker.emit('storefront.'+params.event_prefix+'.'+params.name,params);
            }
        },
        update: {
            handler: function(ctx) {
                ctx.broker.emit('storefront.update',ctx.params);
            }
        },
        remove: {
            handler: function(ctx) {
                ctx.broker.emit('storefront.remove',ctx.params);
            }
        }

    }
}