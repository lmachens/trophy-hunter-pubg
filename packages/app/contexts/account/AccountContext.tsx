import { createContext } from 'react';
import { Account } from './interface';

interface AccountContextProps {
  account?: Account;
  changeAccount?(props: Account): void;
}
const AccountContext = createContext<AccountContextProps>({});

export default AccountContext;
