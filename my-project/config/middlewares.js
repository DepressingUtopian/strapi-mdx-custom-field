module.exports = [
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,  
        directives: {
          "script-src": ["'self'", "cdn.jsdelivr.net", "https:"],
          "connect-src": ["'self'", "cdn.jsdelivr.net", "blob:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
          ],
          "style-src": [
            "'self'",
            "cdn.jsdelivr.net",
            "'unsafe-inline'",
          ],
          "font-src": ["'self'", "cdn.jsdelivr.net"],
        },
        upgradeInsecureRequests: null,
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
