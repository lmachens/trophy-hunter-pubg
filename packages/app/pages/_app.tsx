import '../_bootstrap';

import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import theme from './_theme';
import Web from 'layouts/Web';
import Overwolf from 'layouts/Overwolf';
import { CssBaseline } from '@material-ui/core';

NProgress.configure({ parent: '#__next', showSpinner: false });

Router.events.on('routeChangeStart', (url: string) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const isOverwolfApp = typeof overwolf !== 'undefined' || true;

export default class MyApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles');

    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Head>
            <title>Trophy Hunter</title>
          </Head>
          {isOverwolfApp && (
            <Overwolf>
              <Component {...pageProps} />
            </Overwolf>
          )}
          {!isOverwolfApp && (
            <Web>
              <Component {...pageProps} />
            </Web>
          )}
        </Container>
      </ThemeProvider>
    );
  }
}
