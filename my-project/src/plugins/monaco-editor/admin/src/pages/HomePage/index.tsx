/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";
import pluginId from "../../pluginId";

import Editor from "@monaco-editor/react";
import { mocka } from "./mock";

const HomePage: React.VoidFunctionComponent = () => {
  const [monaco, setMonaco] = useState<any>();
  const [editor, setEditor] = useState<any>();

  const loadStaticDTS = async (libName: string) => {
    const dts = mocka;
    console.log('run setup', monaco.editor.getModels());
    monaco.editor.createModel(dts, 'typescript', monaco.Uri.parse(`file:///node_modules/@types/${libName}/index.d.ts`));
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, `file:///node_modules/@types/${libName}/index.d.ts`);
  }
  

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false
      });

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
      });

      loadStaticDTS('material-ui');
      monaco.editor.createModel(`console.log('Hello world')`, 'typescript', monaco.Uri.parse(`file:///index.tsx`));
    }
  }, [monaco]);

  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <Editor
        height="90vh"
        defaultLanguage="typescript"
        defaultValue="// some comment"
        onMount={(_editor, _monaco) => {
          setMonaco(_monaco);
          setEditor(_editor);
        }}
      />
    </div>
  );
};

export default HomePage;
