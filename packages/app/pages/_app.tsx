import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import theme from 'themes/default';
import Web from 'layouts/Web';
import Overwolf from 'layouts/Overwolf';
import { CssBaseline } from '@material-ui/core';
import { StorageProvider } from 'contexts/storage';
import Main from 'layouts/Main';
import AutoRefresh from 'components/AutoRefresh';

NProgress.configure({ parent: '#__next', showSpinner: false });

Router.events.on('routeChangeStart', () => {
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
    const { Component, pageProps, router } = this.props;

    const content = (
      <Main router={router}>
        <Component {...pageProps} />
      </Main>
    );

    const container = (
      <Container>
        <Head>
          <title>Trophy Hunter</title>
        </Head>
        {isOverwolfApp && <Overwolf>{content}</Overwolf>}
        {!isOverwolfApp && <Web>{content}</Web>}
        <AutoRefresh />
      </Container>
    );

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {typeof localStorage !== 'undefined' && (
          <StorageProvider storage={localStorage}>{container}</StorageProvider>
        )}
        {typeof localStorage === 'undefined' && container}
      </ThemeProvider>
    );
  }
}
