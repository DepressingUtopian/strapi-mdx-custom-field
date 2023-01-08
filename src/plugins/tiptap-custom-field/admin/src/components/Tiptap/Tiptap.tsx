import React, { useEffect, useState, useRef } from 'react';

import {
    useEditor,
    EditorContent,
    BubbleMenu as BubbleMenuElement,
} from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import History from '@tiptap/extension-history';
import BubbleMenu from '@tiptap/extension-bubble-menu';

import {
    Field,
    FieldLabel,
    FieldHint,
    FieldError,
    IconButton,
    IconButtonGroup,
    Stack,
    Button,
} from '@strapi/design-system';
import { Brush, Moon, Sun } from '@strapi/icons';

import Text from '@tiptap/extension-text';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockPrism from 'tiptap-extension-code-block-prism';

import prettier from 'prettier';

import pluginMarkdown from 'prettier/parser-babel';
import { COY_THEME, GRUVBOX_DARK_THEME } from './themes';
import { handleClickBubbleButton, setEditorCodeContent } from './utils';
import { Templates } from './mdxTemplates';

const MenuBar = ({ editor, isDarkTheme, toogleTheme, disabled }) => {
    const formatTextWithPrettier = () => {
        try {
            const text = editor.getText();

            const cursorPos = editor.state.selection.$anchor.pos;
            const formattedText = prettier.formatWithCursor(text, {
                cursorOffset: cursorPos,
                parser: 'babel',
                plugins: [pluginMarkdown],
                embeddedLanguageFormatting: 'auto',
                tabWidth: 4,
                useTabs: true,
                singleAttributePerLine: true,
                semi: false,
                singleQuote: true,
                jsxSingleQuote: true,
                bracketSameLine: true,
            });

            console.log('res', formattedText);
            setEditorCodeContent(editor, formattedText.formatted[0] === ';' ? formattedText.formatted.substring(1) : formattedText.formatted);
        } catch (err) {
            console.error(err);
        }
    };

    return editor ? (
        <IconButtonGroup style={{paddingBottom: '12px'}}>
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
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            BubbleMenu,
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
        if (value && editor) {
            console.log('set value', value);

            setEditorCodeContent(editor, value);
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
                    {editor ? (
                        <BubbleMenuElement
                            editor={editor}
                            tippyOptions={{ duration: 100 }}
                        >
                            <Stack horizontal>
                                {Templates.map((template) => (
                                    <Button
                                        variant='tertiary'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClickBubbleButton(
                                                editor,
                                                template.construct
                                            );
                                        }}
                                    >
                                        {template.label}
                                    </Button>
                                ))}
                            </Stack>
                        </BubbleMenuElement>
                    ) : null}
                    <EditorContent editor={editor} />
                </Container>
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    );
};

export default Tiptap;
