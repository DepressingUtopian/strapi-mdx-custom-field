import React, { useEffect, useState, useRef } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';

import {
    Field,
    FieldLabel,
    FieldHint,
    FieldError,
    IconButton,
    IconButtonGroup,
    Stack,
} from '@strapi/design-system';
import { Brush, Moon, Sun } from '@strapi/icons';

import Text from '@tiptap/extension-text';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockPrism from 'tiptap-extension-code-block-prism';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import prettier from 'prettier';

import pluginMarkdown from 'prettier/parser-markdown';
import { COY_THEME, GRUVBOX_DARK_THEME } from './themes';

const ydoc = new Y.Doc();

// eslint-disable-next-line @typescript-eslint/no-unused-vars


const setEditorCodeContent = (editor, code) => {
    editor.commands.setContent({
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: code,
                    },
                ],
            },
        ],
    });
    editor.chain().setCodeBlock({ language: 'jsx' }).run();
};

const MenuBar = ({ editor, isDarkTheme, toogleTheme, disabled }) => {
    const formatTextWithPrettier = () => {
        try {
            const text = editor.getText();

            const cursorPos = editor.state.selection.$anchor.pos;
            const formattedText = prettier.formatWithCursor(text, {
                cursorOffset: cursorPos,
                parser: 'mdx',
                plugins: [pluginMarkdown],
            });
            setEditorCodeContent(editor, formattedText.formatted);
        } catch (err) {
            console.error(err);
        }
    };

    return editor ? (
        <IconButtonGroup>
            <IconButton
                onClick={() => formatTextWithPrettier()}
                label='Форматировать'
                icon={<Brush />}
                disabled={disabled}
            />
            <IconButton
                onClick={() => toogleTheme()}
                label={isDarkTheme ? 'Светлая тема' : 'Темная тема'}
                icon={isDarkTheme ? <Sun /> : <Moon />}
                disabled={disabled}
            />
        </IconButtonGroup>
    ) : null;
};

const Container = styled.div<{ isDark?: boolean; disabled?: boolean }>`
    padding: 1rem;
    width: 100%;
    position: relative;

    ${({ isDark }) => (isDark ? GRUVBOX_DARK_THEME : COY_THEME)};

    ${({ disabled }) =>
        disabled
            ? css`
                  cursor: not-allowed;
              `
            : ''};

    .custom-editor {
        ${({ isDark, disabled }) =>
            disabled
                ? css`
                      background-color: ${isDark ? '' : '#0000006e'};
                      pointer-events: none;
                  `
                : ''};
    }
`;

const Tiptap = ({
    name,
    error,
    description,
    required,
    attribute,
    intlLabel,
    onChange,
    value,
    type,
    ...props
}: any) => {
    const provider = useRef<WebrtcProvider>();
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CodeBlock.configure({
                exitOnTripleEnter: false,
                exitOnArrowDown: false,
            }),
            // @ts-ignore
            Collaboration.configure({
                document: ydoc,
                field: type + '-' + name,
              }),
            CodeBlockPrism.configure({
                defaultLanguage: 'jsx',
                exitOnTripleEnter: false,
                exitOnArrowDown: false,
                HTMLAttributes: {
                    class: 'language-jsx',
                },
            }),
        ],
        editable: !attribute.disabled,
        content: ``,
        editorProps: {
            attributes: {
                class: 'custom-editor',
            },
        },
    });

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    const updateContent = (editor) => {
        const content = editor.getText();
        console.log('updateContent');
        onChange({
            target: { name, value: content, type: attribute.type },
        });

        if (!editor.isActive('codeBlock')) {
            editor.chain().focus().setCodeBlock({ language: 'jsx' }).run();
        }
    };

    console.log('name', name, 'props', props);

    useEffect(() => {
        if(!provider.current) {
            provider.current = new WebrtcProvider('tiptap-collaboration-extension' + '-' + type + '-' + name, ydoc);
            console.log('create provider', provider, provider.current.awareness.clientID);
        }
       
        return () => {
            if(provider.current) {
                provider.current.destroy();
            }
        }
    }, []);

    useEffect(() => {
        if (value && editor && provider.current) {
            console.log('set value', value);
            const clientsCount =  provider.current.doc.store.clients.size;            
            console.log('clientsCount', clientsCount);
            if(clientsCount === 1) {
                setEditorCodeContent(editor, value);
            }
        }
    }, [editor]);

    useEffect(() => {
        if (editor) {
            editor.on('update', ({ editor }) => {
                updateContent(editor);
            });

            editor.on('focus', ({ editor }) => {
                updateContent(editor);
            });
        }
    }, [editor]);

    return (
        <Field
            id={name}
            name={name}
            error={error}
            hint={description?.defaultMessage}
            required={required}
        >
            <Stack spacing={1}>
                <FieldLabel>{intlLabel.id}</FieldLabel>
                <Container
                    className='editor'
                    isDark={isDarkTheme}
                    disabled={attribute.disabled}
                >
                    <MenuBar
                        editor={editor}
                        isDarkTheme={isDarkTheme}
                        toogleTheme={() => setIsDarkTheme((prev) => !prev)}
                        disabled={attribute.disabled}
                    />
                    <EditorContent editor={editor} />
                </Container>
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    );
};

export default Tiptap;

