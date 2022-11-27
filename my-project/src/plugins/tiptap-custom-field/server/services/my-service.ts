import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    require.resolve('material-ui')
  },
});
