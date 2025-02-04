const stripe = require('stripe')('sk_test_51Qk6KcCOYow4mpBKAIhUWavW5Ey80eBjExYi9feR4FOUfRneEBG7WLsBwrKATcMdcJQIYiorFq6TsuyLXi6Q3Pdr00z8L7gxVO'); // Sostituisci con la tua chiave segreta di Stripe

module.exports = {
  async create(ctx) {
    const { items } = ctx.request.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item) => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.nome_prodotto,
            },
            unit_amount: item.prezzo_unitario * 100, // Converti in centesimi
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      ctx.send({ id: session.id });
    } catch (error) {
      ctx.throw(500, 'Errore durante la creazione della sessione di pagamento');
    }
  },
};
