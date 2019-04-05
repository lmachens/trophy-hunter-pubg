import { useContext } from 'react';
import AccountContext from './AccountContext';

const useChangeAccount = () => {
  return useContext(AccountContext).changeAccount!;
};

export default useChangeAccount;
