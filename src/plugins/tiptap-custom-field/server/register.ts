import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // registeration phase
};

'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'mdx',
    plugin: 'tiptap-custom-field',
    type: 'string',
  });
};