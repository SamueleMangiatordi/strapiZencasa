module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/stripe/create-checkout-session',
        handler: 'stripe.create',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  