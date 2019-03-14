import { useContext, useEffect, useState } from 'react';
import StorageContext from './StorageContext';

const pick = (obj: { [key: string]: any }, props: string[]) =>
  Object.assign({}, ...props.map(prop => ({ [prop]: obj[prop] })));

const useStorage = (subscriptions: string[]) => {
  const { subscribeItems, setItem, removeItem, values = {} } = useContext(StorageContext);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    subscribeItems(subscriptions, () => {
      setSubscribed(true);
    });
  }, []);

  return {
    storageValues: pick(values, subscriptions),
    setItem,
    removeItem,
    subscribed
  };
};

export default useStorage;
