import '../_bootstrap';

import { createGenerateClassName, StylesProvider } from '@material-ui/styles';
import { SheetsRegistry } from 'jss';
import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document';
import React from 'react';

class JssDocument extends Document<{ registry: SheetsRegistry }> {
  static async getInitialProps(ctx: NextDocumentContext) {
    const registry = new SheetsRegistry();
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <StylesProvider
            sheetsManager={sheetsManager}
            sheetsRegistry={registry}
            generateClassName={generateClassName}
          >
            <App {...props} />
          </StylesProvider>
        )
      });

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      registry
    };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="description" content="Earn Trophies for playing PUBG!" />
          <meta property="og:description" content="Earn Trophies for playing PUBG!" />
          <meta
            name="keywords"
            content="PUBG, PUBG App, PUBG Guide, Real-time In Game, Statistics, PUBG Spectate, Overwolf, Trophies"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/static/index.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <style
            id="server-side-styles"
            dangerouslySetInnerHTML={{ __html: this.props.registry.toString() }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default JssDocument;
