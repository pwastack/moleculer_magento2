module.exports = function (url,token) {
    const ENDPOINT = url;

    return {
        actions: {
            'order.getOrders': {
                handler: async function(ctx) {
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/orders',
                        token,
                        params: {
                            searchCriteria: ctx.params.searchCriteria
                        }
                    })
                }
            },
            'order.getOrder': {
                handler: async function(ctx) {

                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/orders/'+ctx.params.orderId,
                        token
                    })
                }
            },
            'cart.getCart': {
                handler: async function(ctx){
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/carts/'+ctx.params.cartId,
                        token
                    })
                }
            },
            'cart.newGuestCart': {
                handler: async function(ctx){
                    return await ctx.broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/guest-carts',
                        token
                    })
                }
            },
            'guest-cart.addToCart': {
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/guest-carts/'+ctx.params.cartItem.quote_id+'/items',
                        params: {
                            cartItem: ctx.params.cartItem
                        },
                        token
                    })
                }
            },

            'guest-cart.setAddress': {
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/guest-carts/'+ctx.params.cartId+'/shipping-information',
                        params: {
                            addressInformation: ctx.params.addressInformation
                        },
                        token
                    })
                }
            },
            'guest-cart.placeOrder': {
                handler: async function (ctx){

                    return await ctx.broker.call('magento.rest.PUT',{
                        url: ENDPOINT+ '/guest-carts/'+ctx.params.cartId+'/order',
                        params: {
                            paymentMethod: ctx.params.paymentMethod
                        },
                        token
                    })
                }
            },
            'guest-cart.getPaymentMethods': {
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/guest-carts/'+ctx.params.cartId+'/payment-information',
                        token
                    })
                }
            },



        }
    }
}