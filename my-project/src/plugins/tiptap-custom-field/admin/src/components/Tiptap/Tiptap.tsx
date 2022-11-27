import React, {useEffect} from 'react';

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { lowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import markdown from 'highlight.js/lib/languages/markdown';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import ts from 'highlight.js/lib/languages/typescript';

import CodeBlockComponent from './CodeBlockComponent';

import './dracula.css';

lowlight.registerLanguage('markdown', markdown);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  useEffect(() => {
    editor.chain().focus().toggleCodeBlock().run()
  }, []);

  return (
    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
      code block
    </button>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight
      .extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        },
      })
        .configure({ lowlight }),
    ],
    content: `
    <p><Dialog onClose={() => setIsVisibleLinkDialog(false)} title="Insert link" isOpen={isVisibleLinkDialog}>
    <DialogBody>
      <Stack spacing={2}>
        <TextInput
          label="Link URL"
          placeholder="Write or paste the url here"
          name="url" onChange={e => setLinkInput(e.target.value)}
          value={linkInput}
          aria-label="URL"/>
        <Select
          id="linkTargetSelect"
          label="Link target"
          required
          placeholder="Select link target"
          value={linkTargetInput}
          onChange={setLinkTargetInput} >
          <Option value={'_self'}>Self</Option>
          <Option value={'_blank'}>Blank</Option>
          <Option value={'_parent'}>Parent</Option>
          <Option value={'_top'}>Top</Option>
        </Select>
      </Stack>
    </DialogBody>
    <DialogFooter startAction={<Button onClick={() =>  {setLinkInput(''); setLinkTargetInput(''); setIsVisibleLinkDialog(false)}} variant="tertiary">
      Cancel
    </Button>} endAction={<Button onClick={() => onInsertLink()} variant="success-light">
      Insert link
    </Button>} />
  </Dialog>
    </p>`,
  });

  return (
    <div className='editor'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap