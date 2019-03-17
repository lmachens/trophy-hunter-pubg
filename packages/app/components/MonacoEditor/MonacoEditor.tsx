import React, { FunctionComponent, useRef, useEffect } from 'react';
import lib from './lib';

// I couldn't manage to implement monaco-editor or react-monaco-editor directly.
// So I directly load the modules from microsoft for now.
const MonacoEditor: FunctionComponent<any> = ({ className, onChange, value, ...other }) => {
  const container = useRef<HTMLDivElement>(null);
  const editor = useRef<any>(null);

  const initMonaco = () => {
    // @ts-ignore
    const monaco = window.monaco !== 'undefined' ? window.monaco : false;
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(lib);

      editor.current = monaco.editor.create(container.current, {
        automaticLayout: true,
        value,
        ...other
      });
      editor.current.onDidChangeModelContent(() => {
        const newValue = editor.current.getValue();
        onChange(newValue);
      });
      editor.current.setValue(value);
      editor.current.getAction('editor.action.formatDocument').run();
    } else {
      setTimeout(initMonaco, 100);
    }
  };
  useEffect(() => {
    initMonaco();
    return () => {
      if (editor.current) {
        editor.current.dispose();
        // @ts-ignore
        editor.current = null;
      }
    };
  }, [!editor.current || value !== editor.current.getValue()]);

  return <div ref={container} className={className} />;
};

export default MonacoEditor;
