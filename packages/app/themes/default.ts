import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f8b834'
    },
    secondary: {
      main: '#bc7229'
    },
    background: {
      paper: '#1d1c1d'
    },
    error: {
      main: '#ff2312'
    }
  },
  typography: {
    caption: {
      color: `#c4c4c4`
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: '#fff',
        backgroundColor: '#0a0a0c'
      },
      root: {
        border: 'none',
        borderBottom: `1px solid #4b4b4b`
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#111318',
        border: '1px solid rgba(255, 255, 255, 0.23)',
        maxWidth: 350,
        fontSize: '0.7rem',
        textAlign: 'center'
      }
    },
    MuiSnackbarContent: {
      root: {
        color: '#fff',
        backgroundColor: '#bc7229'
      },
      message: {
        margin: '0 auto'
      }
    },
    MuiTableCell: {
      root: {
        padding: '2px 8px',
        borderBottom: 'none'
      }
    },
    MuiCardHeader: {
      root: {
        padding: '8px 16px'
      }
    },
    MuiCardContent: {
      root: {
        background: '#303030'
      }
    }
  }
});

export default theme;
