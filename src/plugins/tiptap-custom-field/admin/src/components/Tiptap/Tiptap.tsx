import React, { useEffect } from 'react';

import {
    useEditor,
    EditorContent,
} from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';


import { Button } from '@strapi/design-system';

import Text from '@tiptap/extension-text';

import styled from '@emotion/styled';
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockPrism from 'tiptap-extension-code-block-prism';


const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    useEffect(() => {
        editor.chain().focus().toggleCodeBlock().run();
    }, []);

    return (
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
            code block
        </button>
    );
};

const Container = styled.div`
    padding: 1rem;
    position: relative;

    code[class*='language-'],
    pre[class*='language-'] {
        color: #abb2bf;
        background: none;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    pre[class*='language-']::-moz-selection,
    pre[class*='language-'] ::-moz-selection,
    code[class*='language-']::-moz-selection,
    code[class*='language-'] ::-moz-selection {
        text-shadow: none;
        background: #383e49;
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection,
    code[class*='language-']::selection,
    code[class*='language-'] ::selection {
        text-shadow: none;
        background: #9aa2b1;
    }

    @media print {
        code[class*='language-'],
        pre[class*='language-'] {
            text-shadow: none;
        }
    }
    /* Code blocks */
    pre[class*='language-'] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
        background: #282c34;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: #5c6370;
    }

    .token.punctuation {
        color: #abb2bf;
    }

    .token.selector,
    .token.tag {
        color: #e06c75;
    }

    .token.property,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.attr-name,
    .token.deleted {
        color: #d19a66;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.builtin,
    .token.inserted {
        color: #98c379;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: #56b6c2;
    }

    .token.atrule,
    .token.keyword {
        color: #c678dd;
    }

    .token.function {
        color: #61afef;
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: #c678dd;
    }

    .token.important,
    .token.bold {
        font-weight: bold;
    }

    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

    pre.line-numbers {
        position: relative;
        padding-left: 3.8em;
        counter-reset: linenumber;
    }

    pre.line-numbers > code {
        position: relative;
    }

    .line-numbers .line-numbers-rows {
        position: absolute;
        pointer-events: none;
        top: 0;
        font-size: 100%;
        left: -3.8em;
        width: 3em; /* works for line-numbers below 1000 lines */
        letter-spacing: -1px;
        border-right: 0;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .line-numbers-rows > span {
        pointer-events: none;
        display: block;
        counter-increment: linenumber;
    }

    .line-numbers-rows > span:before {
        content: counter(linenumber);
        color: #5c6370;
        display: block;
        padding-right: 0.8em;
        text-align: right;
    }

    .token.tag.class-name {
      color: #8be9fd;
    }
    
    .custom-editor {
        min-height: 420px;
        max-height: 500px;
        background: white;
        overflow-y: scroll;
    }
`;

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CodeBlock,
            CodeBlockPrism.configure({
                defaultLanguage: 'jsx',
            }),
        ],
        content: ``,
        editorProps: {
            attributes: {
                class: 'custom-editor'
            }
        }
    });

    useEffect(() => {
        if(editor) {
            editor.on('update', () => {
                if(!editor.isActive('codeBlock')) {
                    console.log('update event');
                    editor.chain().focus().setCodeBlock().run();     
                }
              })
        }
    }, [editor]);
    
    return (
        <Container className='editor'>
            {/* <MenuBar editor={editor} /> */}
            <EditorContent editor={editor}   />
        </Container>
    );
};

export default Tiptap;
