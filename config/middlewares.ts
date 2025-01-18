export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // URL del tuo frontend React
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Metodi HTTP consentiti
      headers: ['Content-Type', 'Authorization', 'Accept'], // Header consentiti
      keepHeaderOnError: true, // Mantieni l'header nelle risposte di errore
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
