'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        try {
            // Extract fields from the request body
            const { email, phoneNumber, firstName, lastName, selectedPaper , selectedOptions,selectedPayment , products } = ctx.request.body;

            // Log the received data
            console.log('Received data:', { email, phoneNumber, firstName, lastName, selectedPaper , selectedOptions , selectedPayment , products   });

            // Create the order using the order service
            const order = await strapi.services['api::order.order'].create({
                data: {
                    email,
                    phoneNumber,
                    firstName,
                    lastName,
                    selectedPaper,
                    selectedOptions,
                    selectedPayment,
                    products,
                    
                     // Include selectedPaper in the order data
                },
            });

            // Log the order creation
            console.log('Order created:', order);

            // Return a success response
            ctx.response.status = 200; // HTTP 200 OK
            ctx.response.body = { order , successUrl: '/checkout-succes', };
            
        } catch (err) {
            // Log and return the error
            console.error('Error creating order:', err);
            ctx.response.status = 500; // HTTP 500 Internal Server Error
            ctx.response.body = { error: 'Internal Server Error' };
        }
    },
}));