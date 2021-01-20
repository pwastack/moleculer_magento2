module.exports = function (url,token) {
    const ENDPOINT = url;

    return {
        actions: {
            getProduct: {
                handler: async function (ctx) {
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products/'+ctx.params.sku,
                        token,
                    })
                }
            },
            getProductById: {
                handler: async function (ctx) {
                    return {items} =  await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products',
                        token,
                        params: {
                            searchCriteria: {
                                filterGroups: [{
                                    filters: [{
                                        field: 'entity_id',
                                        value: ctx.params.id,
                                        conditionType: 'eq'
                                    }]
                                }]
                            }
                        }
                    })

                }
            },
            searchProducts: {
                handler: async function (ctx) {
                    return {items}  = await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products',
                        token,
                        params: {
                            searchCriteria: ctx.params.searchCriteria
                        }
                    })
                }
            },
            getCategories: {
                cache:true,
                handler: async function({broker}) {
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/categories/list',
                        token,
                        params: {
                            searchCriteria:{
                                currentPage: 1,
                                pageSize: 10000
                            }
                        }
                    })
                }
            },
            getCustomers: {
                handler: async function({broker,params = {
                    searchCriteria: {
                        currentPage: 1,
                        pageSize:  10000,
                        filterGroups: [
                            {
                                filters: [
                                    {
                                        conditionType: 'eq',
                                        field: ''
                                    }
                                ]
                            }
                        ]
                    },

                }}) {
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/customers/search',
                        token,
                        params
                    })
                }
            },

            saveCustomer: {
                handler: async function({broker,params}) {
                    return await broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/customers',
                        data: params,
                        token
                    })
                }
            },
            saveProduct: {
                retryPolicy: {
                    enabled: true,
                    // All Retry policy options can be overwritten from broker options.
                    retries: 3,
                    delay: 2000,
                    check: (err) => {
                        return err.code === 400
                    }
                },
                handler: async function ({broker,params}) {
                    return broker.call('magento.rest.POST', {
                        url: ENDPOINT + '/products',
                        data: {
                            product: params.product
                        },
                        token
                    }).catch(e => {
                        console.log(params.product);
                    });
                }
            },
            updateProduct: {
                retryPolicy: {
                    enabled: true,
                    // All Retry policy options can be overwritten from broker options.
                    retries: 3,
                    delay: 2000,
                    check: (err) => {
                        return err.code === 400
                    }
                },
                handler: async function ({broker,params}) {
                    return await broker.call('magento.rest.PUT',{
                        url: ENDPOINT+ '/products/'+params.sku,
                        data: {
                            product: params.product
                        },
                        token
                    })
                }
            },
            scheduleUpdateProduct: {
                retryPolicy: {
                    enabled: true,
                    retries: 3,
                    delay:2000,
                    check: (err) => {
                        return err.code === 400
                    }
                },
                handler: async function ({broker,params}) {
                    return await broker.call('magento.rest.PUT',{
                        url: ENDPOINT+ '/products/'+params.sku,
                        data: {
                            product: params.product
                        },
                        token
                    })
                }
            },

            deleteProductBySku: {
                handler: async function ({broker,params}) {
                    return await broker.call('magento.rest.DELETE',{
                        url: ENDPOINT+ '/products/'+params.sku,
                        token
                    })
                }
            },
            saveCategory: {
                handler: async function ({broker,params}) {
                    return await broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/categories',
                        data: params,
                        token
                    })
                }
            },
            getAttributeOptions: {
                cache: {
                    keys: ["attributeCode"]
                },
                handler: async function({broker,params}){
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products/attributes/'+params.attributeCode+'/options',
                        token
                    })
                }
            },
            searchAttributes: {
                cache: true,
                handler: async function({broker,params}){
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products/attributes',
                        params: {
                            searchCriteria: params.searchCriteria
                        },
                        token
                    })
                }
            },
            getAttribute: {
                cache: {
                    keys: ["attributeCode"]
                },
                handler: async function({broker,params}){
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/products/attributes/'+params.attributeCode,
                        token
                    })
                }
            },
            getBrands: {
                cache:true,
                handler: async function({broker}) {
                    return await broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/mpbrand',
                        token
                    })
                }
            },
            searchBrandByName: {
                handler: async function({broker,params}) {
                    return await broker.call('magento.rest.GET', {
                        url: ENDPOINT + '/mpbrand/brands/search/' + params.brand_name,
                        token
                    })
                }
            },
            getBrandById: {
                handler: async function(ctx){
                    return await ctx.broker.call('magento.rest.GET',{
                        url: ENDPOINT+ '/mpbrand/brand/'+ctx.params.id,
                        token
                    })
                }
            },
            saveBrand: {
                handler: async function(ctx){
                    return await ctx.broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/mpbrand/options',
                        data: {
                            option: ctx.params.brand
                        },
                        token
                    })
                }
            },
            updateBrand: {
                handler: async function(ctx){
                    return await ctx.broker.call('magento.rest.PUT',{
                        url: ENDPOINT+ '/mpbrand/options/'+ctx.params.option_id,
                        data: {
                            option: ctx.params.brand
                        },
                        token
                    })
                }
            },
            uploadProductMedia:{
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.POST',{
                        url: ENDPOINT+ '/products/'+ctx.params.sku+'/media',
                        data: {
                            entry: ctx.params.entry
                        },
                        token
                    })
                }
            },
            deleteProductMedia:{
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.DELETE',{
                        url: ENDPOINT+ '/products/'+ctx.params.sku+'/media/'+ctx.params.entry_id,
                        token
                    })
                }
            },
            updateProductMedia: {
                handler: async function (ctx){
                    return await ctx.broker.call('magento.rest.PUT',{
                        url: ENDPOINT+ '/products/'+ctx.params.sku+'/media/'+ctx.params.entry_id,
                        data: {
                            entry: ctx.params.entry
                        },
                        token
                    })
                }
            }

        }
    }
}