import React, { FunctionComponent, useState } from 'react';
import AccountContext from './AccountContext';
import { setCookie } from 'nookies';
import { Account } from './interface';

interface AccountProviderProps {
  defaultAccount?: Account;
}

const AccountProvider: FunctionComponent<AccountProviderProps> = ({ children, defaultAccount }) => {
  const [account, setAccount] = useState(defaultAccount);

  const changeAccount = (newAccount: Account) => {
    setCookie(
      undefined,
      'thPubg',
      `${newAccount.platform};${newAccount.playerName};${newAccount.id}`,
      {
        maxAge: 365 * 24 * 60 * 60,
        path: '/'
      }
    );
    setAccount(newAccount);
  };

  const value = {
    account,
    changeAccount
  };
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
