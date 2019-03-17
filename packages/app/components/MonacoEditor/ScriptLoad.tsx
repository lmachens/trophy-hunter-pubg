import React, { FunctionComponent } from 'react';
import Head from 'next/head';

const ScriptLoad: FunctionComponent = () => {
  return (
    <Head>
      <script src="https://microsoft.github.io/monaco-editor/node_modules/monaco-editor/min/vs/loader.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `require.config({ paths: { 'vs': 'https://microsoft.github.io/monaco-editor/node_modules/monaco-editor/min/vs' }});
  require(['vs/editor/editor.main'], console.log);`
        }}
      />
    </Head>
  );
};

export default ScriptLoad;
