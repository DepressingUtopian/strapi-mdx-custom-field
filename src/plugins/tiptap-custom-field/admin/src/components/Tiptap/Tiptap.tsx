import React, { useEffect, useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import History from '@tiptap/extension-history';

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

import prettier from 'prettier';

import pluginMarkdown from 'prettier/parser-markdown';
import { COY_THEME, GRUVBOX_DARK_THEME } from './themes';

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
    ...props
}: any) => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            History.configure({
                depth: 10,
            }),
            CodeBlock.configure({
                exitOnTripleEnter: false,
                exitOnArrowDown: false,
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

        onChange({
            target: { name, value: content, type: attribute.type },
        });

        if (!editor.isActive('codeBlock')) {
            editor.chain().focus().setCodeBlock({ language: 'jsx' }).run();
        }
    };

    useEffect(() => {
        if (value && editor) {
            setEditorCodeContent(editor, value);
        }
    }, [value, editor]);

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
