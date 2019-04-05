import { ThemeProvider } from '@material-ui/styles';
import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import theme from 'themes/default';
import { CssBaseline } from '@material-ui/core';
import Main from 'layouts/Main';
import AppLayout from 'layouts/App';
import ContributionDrawerContent from 'components/ContributionDrawerContent';
import { parseCookies } from 'nookies';
import { AccountProvider } from 'contexts/account';
import { Account } from 'contexts/account';

NProgress.configure({ parent: '#__next', showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface PageProps {
  account?: Account;
}

export default class MyApp extends App<PageProps> {
  componentDidMount() {
    const style = document.getElementById('server-side-styles');

    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }

  static async getInitialProps(appContext: NextAppContext) {
    const { thPubg = null } =
      appContext.ctx.req && appContext.ctx.req.headers
        ? parseCookies(appContext.ctx)
        : parseCookies();

    const pageProps: PageProps = {};
    if (thPubg) {
      const [platform, playerName, id] = thPubg.split(';');
      pageProps.account = { platform, playerName, id };
    }

    const initialProps = await App.getInitialProps(appContext);

    return {
      ...initialProps,
      pageProps: {
        ...initialProps.pageProps,
        ...pageProps
      }
    };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    let drawerContent;
    if (router.route.startsWith('/contribution')) {
      drawerContent = <ContributionDrawerContent router={router} />;
    }
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
      </Container>
    );

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AccountProvider defaultAccount={pageProps.account}>{container}</AccountProvider>
      </ThemeProvider>
    );
  }
}
