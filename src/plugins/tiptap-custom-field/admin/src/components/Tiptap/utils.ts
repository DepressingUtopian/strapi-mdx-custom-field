export const setEditorCodeContent = (editor, code: string) => {
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

export const handleClickBubbleButton = (
    editor,
    construct: (wrappedText: string) => string
) => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const selectedText = state.doc.textBetween(from, to, '');
    const code = editor.getText();
    const newContent =
        code.substring(0, from - 1) + construct(selectedText) + code.substring(to);
    setEditorCodeContent(editor, newContent);
};
