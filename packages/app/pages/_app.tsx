/* eslint-disable @typescript-eslint/camelcase */
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
import { parseCookies } from 'nookies';
import { AccountProvider } from 'contexts/account';
import { Account } from 'contexts/account';
import { LiveProvider } from 'contexts/live';
import matomo from 'utilities/matomo';

NProgress.configure({ parent: '#__next', showSpinner: false });
if (typeof window !== 'undefined') {
  matomo.track({
    url: location.href,
    action_name: location.pathname.substr(1) || 'player'
  });
}
Router.events.on('routeChangeStart', (url: string) => {
  console.log(url);
  NProgress.start();
  matomo.track({
    url: `${window.origin}${url}`,
    action_name: url.substr(1).split('?')[0] || 'player'
  });
});

Router.events.on('routeChangeComplete', () => {
  const main = document.getElementById('main');
  if (main) {
    main.scrollTop = 0;
  }

  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

interface PageProps {
  account?: Account;
}

interface MyAppProps {
  clientNeedsProps: boolean;
}

export default class MyApp extends App<MyAppProps> {
  state = { gotInitialProps: !this.props.clientNeedsProps };

  componentDidMount() {
    console.log('Welcome to Trophy Hunter PUBG!');
    const style = document.getElementById('server-side-styles');

    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }

    if (this.props.clientNeedsProps) {
      Router.replace(Router.pathname + location.search).then(() => {
        this.setState({ gotInitialProps: true });
      });
    }
  }

  static async getInitialProps(appContext: NextAppContext) {
    const { thPubg = null } =
      appContext.ctx.req && appContext.ctx.req.headers
        ? parseCookies(appContext.ctx)
        : parseCookies();

    const pageProps: PageProps = {};
    if (thPubg) {
      const [platform, playerName, recentMatch] = thPubg.split(';');
      pageProps.account = { platform, playerName, recentMatch };
    }
    const initialProps = await App.getInitialProps(appContext);

    const clientNeedsProps =
      !process.browser && !(appContext.ctx.req && appContext.ctx.req.headers);

    return {
      ...initialProps,
      pageProps: {
        ...initialProps.pageProps,
        ...pageProps
      },
      clientNeedsProps
    };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    const { gotInitialProps } = this.state;

    const container = (
      <Container>
        <Head>
          <title>Trophy Hunter</title>
        </Head>
        <AppLayout router={router}>
          <Main>
            <Component {...pageProps} />
          </Main>
        </AppLayout>
      </Container>
    );

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {gotInitialProps && (
          <AccountProvider defaultAccount={pageProps.account}>
            <LiveProvider>{container}</LiveProvider>
          </AccountProvider>
        )}
      </ThemeProvider>
    );
  }
}
