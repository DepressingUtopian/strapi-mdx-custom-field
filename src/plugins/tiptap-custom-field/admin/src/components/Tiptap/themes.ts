import { css } from '@emotion/react';

export const COY_THEME = css`
    .custom-editor {
        min-height: 420px;
        max-height: 500px;
        overflow: auto;
        position: relative;
        z-index: 1;
        border-left: 10px solid #358ccb;
        box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;
        background-color: #fdfdfd;
        background-image: linear-gradient(
            transparent 50%,
            rgba(69, 142, 209, 0.04) 50%
        );
        background-size: 3em 3em;
        background-origin: content-box;
        background-attachment: local;
        padding: 0.4rem 1rem;
    }

    code[class*='language-'],
    pre[class*='language-'] {
        color: black;
        background: none;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 1em;
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

    /* Code blocks */
    pre[class*='language-'] {
        position: relative;
    }

    pre[class*='language-'] > code {
        display: block;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
        position: relative;
        padding: 0.2em;
        border-radius: 0.3em;
        color: #c92c2c;
        border: 1px solid rgba(0, 0, 0, 0.1);
        display: inline;
        white-space: normal;
        background-color: #fdfdfd;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: #7d8b99;
    }

    .token.punctuation {
        color: #5f6364;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.function-name,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #c92c2c;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.function,
    .token.builtin,
    .token.inserted {
        color: #2f9c0a;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .token.variable {
        color: #a67f59;
        background: rgba(255, 255, 255, 0.5);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword,
    .token.class-name {
        color: #1990b8;
    }

    .token.regex,
    .token.important {
        color: #e90;
    }

    .language-css .token.string,
    .style .token.string {
        color: #a67f59;
        background: rgba(255, 255, 255, 0.5);
    }

    .token.important {
        font-weight: normal;
    }

    .token.bold {
        font-weight: bold;
    }

    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

    .token.namespace {
        opacity: 0.7;
    }
`;

export const GRUVBOX_DARK_THEME = css`
    .custom-editor {
        min-height: 420px;
        max-height: 500px;
        padding: 1em;
        overflow: auto;
        padding: 0.4rem 1rem;
        background: #1d2021;
        border-left: 10px solid #fabd2f;
    }

    code[class*='language-'],
    pre[class*='language-'] {
        color: #ebdbb2; /* fg1 / fg */
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
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
        color: #fbf1c7; /* fg0 */
        background: #7c6f64; /* bg4 */
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection,
    code[class*='language-']::selection,
    code[class*='language-'] ::selection {
        color: #fbf1c7; /* fg0 */
        background: #7c6f64; /* bg4 */
    }


    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
        background: #1d2021; /* bg0_h */
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 0.3em;
    }

    .token.comment,
    .token.prolog,
    .token.cdata {
        color: #a89984; /* fg4 / gray1 */
    }

    .token.delimiter,
    .token.boolean,
    .token.keyword,
    .token.selector,
    .token.important,
    .token.atrule {
        color: #fb4934; /* red2 */
    }

    .token.operator,
    .token.punctuation,
    .token.attr-name {
        color: #a89984; /* fg4 / gray1 */
    }

    .token.tag,
    .token.tag .punctuation,
    .token.doctype,
    .token.builtin {
        color: #fabd2f; /* yellow2 */
    }

    .token.entity,
    .token.number,
    .token.symbol {
        color: #d3869b; /* purple2 */
    }

    .token.property,
    .token.constant,
    .token.variable {
        color: #fb4934; /* red2 */
    }

    .token.string,
    .token.char {
        color: #b8bb26; /* green2 */
    }

    .token.attr-value,
    .token.attr-value .punctuation {
        color: #a89984; /* fg4 / gray1 */
    }

    .token.url {
        color: #b8bb26; /* green2 */
        text-decoration: underline;
    }

    .token.function {
        color: #fabd2f; /* yellow2 */
    }

    .token.regex {
        background: #b8bb26; /* green2 */
    }

    .token.bold {
        font-weight: bold;
    }

    .token.italic {
        font-style: italic;
    }

    .token.inserted {
        background: #a89984; /* fg4 / gray1 */
    }

    .token.deleted {
        background: #fb4934; /* red2 */
    }
`;
