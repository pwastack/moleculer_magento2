module.exports = function (url,token) {
    const ENDPOINT = url;

    return {
        actions: {
            'customer.searchCustomers': {
                handler: async function(ctx) {
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/customers/search',
                        token,
                        params: {
                            searchCriteria: ctx.params.searchCriteria
                        }
                    })
                }
            },
            'customer.getCustomer': {
                handler: async function(ctx) {
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/customers/'+ctx.params.customerId,
                        token
                    })
                }
            },
            'customer.getAddress': {
                handler: async function(ctx){
                    console.log(ctx.params.addressId);
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/customers/addresses/'+ctx.params.addressId,
                        token
                    })
                }
            }
        }
    }
}