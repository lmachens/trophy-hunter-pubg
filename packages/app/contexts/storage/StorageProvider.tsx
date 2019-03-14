import React, { FunctionComponent, useEffect, useState } from 'react';
import { StorageValue } from './interfaces';
import StorageContext from './StorageContext';

interface Subscription {
  count: number; // number of subscribers
  value: any;
}

interface StorageProviderProps {
  storage: Storage;
}

interface StorageProviderState {
  [key: string]: Subscription | undefined;
}

const StorageProvider: FunctionComponent<StorageProviderProps> = ({ children, storage }) => {
  const [state, setState] = useState<StorageProviderState>({});

  const handleStorage = (event: StorageEvent) => {
    if (event.storageArea === storage && event.key) {
      if (!state[event.key]) {
        return;
      }
      const newState = { ...state };
      if (event.newValue === null || event.newValue === undefined) {
        newState[event.key]!.value = undefined;
      } else {
        try {
          newState[event.key] = {
            count: state[event.key!]!.count,
            value: JSON.parse(event.newValue)
          };
        } catch (error) {}
      }
      setState(newState);
    }
  };

  const getValues = () => {
    const values = Object.entries(state)
      .filter(([, value]) => value)
      .map(([key, value]) => ({ [key]: value!.value }));
    return Object.assign({}, ...values);
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [Object.keys(state)]);

  const subscribeItems = async (keys: [string], callback?: any) => {
    const newState: StorageProviderState = {};
    keys.forEach(key => {
      let value;
      try {
        const data = storage.getItem(key);
        if (data) {
          value = JSON.parse(data);
        }
      } catch (error) {
        value = undefined;
      }
      const sub = state[key] || {
        count: 0,
        value
      };
      sub.count++;
      newState[key] = sub;
    });
    setState(newState);

    if (callback) {
      const values = getValues();
      callback(values);
    }
  };

  const setItem = async (key: string, value: any) => {
    if (state[key]) {
      setState({
        ...state,
        [key]: {
          count: state[key]!.count,
          value: value
        }
      });
    }
    storage.setItem(key, JSON.stringify(value));
  };

  const removeItem = async (key: string) => {
    if (state[key]) {
      const newState = { ...state };
      delete newState[key];
      setState(newState);
    }
    storage.removeItem(key);
  };

  const values = getValues();
  const storageValue: StorageValue = {
    subscribeItems,
    setItem,
    removeItem,
    values
  };

  return <StorageContext.Provider value={storageValue}>{children}</StorageContext.Provider>;
};

export default StorageProvider;
