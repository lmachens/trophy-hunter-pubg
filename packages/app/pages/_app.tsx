import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import theme from 'themes/default';
import { CssBaseline } from '@material-ui/core';
import { StorageProvider } from 'contexts/storage';
import Main from 'layouts/Main';
import AutoRefresh from 'components/AutoRefresh';
import AppLayout from 'layouts/App';
import AppDrawerContent from 'components/AppDrawerContent';
import ContributionDrawerContent from 'components/ContributionDrawerContent';

NProgress.configure({ parent: '#__next', showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles');

    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;

    const drawerContent = router.route.startsWith('/contribution') ? (
      <ContributionDrawerContent router={router} />
    ) : (
      <AppDrawerContent router={router} />
    );
    const content = (
      <Main drawerContent={drawerContent}>
        <Component {...pageProps} />
      </Main>
    );

    const container = (
      <Container>
        <Head>
          <title>Trophy Hunter</title>
        </Head>
        <AppLayout router={router}>{content}</AppLayout>
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
