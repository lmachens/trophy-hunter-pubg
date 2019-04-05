import { useContext } from 'react';
import AccountContext from './AccountContext';

const useAccount = () => {
  return useContext(AccountContext).account;
};

export default useAccount;
