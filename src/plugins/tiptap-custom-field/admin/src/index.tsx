import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import FieldIcon from './components/FieldIcon/FieldIcon';

const name = pluginPkg.strapi.name;

export default {
    register(app) {
        app.customFields.register({
            name: 'mdx',
            type: 'string',
            pluginId: 'tiptap-custom-field',
            intlLabel: {
                id: 'tiptap-custom-field.mdx.label',
                defaultMessage: 'MDX',
            },
            intlDescription: {
                id: 'tiptap-custom-field.mdx.description',
                defaultMessage:
                    'Поле c возможностью форматирования и подсветки MDX разметки',
            },
            icon: FieldIcon,
            components: {
                Input: async () =>
                    import(
                        /* webpackChunkName: "tiptap-component" */ './components/Tiptap/Tiptap'
                    ),
            },
            options: {
                base: [
                    {
                        sectionTitle: {
                            id: 'tiptap-custom-field.section.required',
                            defaultMessage: 'Состояние',
                        },
                        items: [
                            {
                                intlLabel: {
                                    id: 'tiptap-custom-field.required.label',
                                    defaultMessage: 'Обязательный',
                                  },
                                  name: 'required',
                                  type: 'checkbox',
                                  value: true,
                            },
                            {
                                intlLabel: {
                                    id: 'tiptap-custom-field.required.label',
                                    defaultMessage: 'Заблокированный',
                                  },
                                  name: 'disabled',
                                  type: 'checkbox',
                                  value: true,
                            }
                        ]
                    },
                ],
            },
        });

        const plugin = {
            id: pluginId,
            initializer: Initializer,
            isReady: false,
            name,
        };

        app.registerPlugin(plugin);
    },

    bootstrap(app) {},
    async registerTrads(app) {
        const { locales } = app;

        const importedTrads = await Promise.all(
            locales.map((locale) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, pluginId),
                            locale,
                        };
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        };
                    });
            })
        );

        return Promise.resolve(importedTrads);
    },
};
