import { useContext, useEffect } from 'react';
import StorageContext from './StorageContext';

const pick = (obj: { [key: string]: any }, props: string[]) =>
  Object.assign({}, ...props.map(prop => ({ [prop]: obj[prop] })));

const useStorage = (subscriptions: string[]) => {
  const { subscribeItems, setItem, removeItem, values = {} } = useContext(StorageContext);

  useEffect(() => {
    subscribeItems(subscriptions);
  }, []);

  return {
    storageValues: pick(values, subscriptions),
    setItem,
    removeItem
  };
};

export default useStorage;
