import React, { FunctionComponent, useEffect, useState } from 'react';
import { StorageValue } from './interfaces';
import StorageContext from './StorageContext';

interface Subscription {
  count: number; // number of subscribers
  value: string;
}

interface StorageProviderProps {
  storage?: Storage;
  defaultState?: {
    [key: string]: string;
  };
}

interface StorageProviderState {
  [key: string]: Subscription | undefined;
}

const StorageProvider: FunctionComponent<StorageProviderProps> = ({
  children,
  defaultState,
  storage
}) => {
  if (!storage && typeof localStorage !== 'undefined') {
    storage = localStorage;
  }
  const [state, setState] = useState<StorageProviderState>({});

  const handleStorage = (event: StorageEvent) => {
    if (event.storageArea === storage && event.key) {
      if (!state[event.key]) {
        return;
      }

      setState(prevState => {
        const newState =
          event.newValue === null || event.newValue === undefined
            ? {
                [event.key!]: {
                  count: prevState[event.key!].count,
                  value: undefined
                }
              }
            : {
                [event.key!]: {
                  count: prevState[event.key!].count,
                  value: event.newValue
                }
              };

        return {
          ...prevState,
          ...newState
        };
      });
    }
  };

  const getValues = () => {
    const values = Object.entries(state)
      .filter(([, value]) => value)
      .map(([key, value]) => ({ [key]: value.value }));
    return Object.assign({}, ...values);
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [state]);

  const subscribeItems = async (keys: [string], callback?) => {
    await setState(prevState => {
      const newState = {};
      keys.forEach(key => {
        const sub = prevState[key] || {
          count: 0,
          value: storage.getItem(key) || (defaultState && defaultState[key])
        };
        sub.count++;
        newState[key] = sub;
      });

      return {
        ...prevState,
        ...newState
      };
    });

    if (callback) {
      const values = getValues();
      callback(values);
    }
  };

  const unsubscribeItems = (keys: [string]) => {
    setState(prevState => {
      const newState = { ...prevState };
      keys.forEach(key => {
        if (!newState[key] || newState[key].count <= 1) {
          newState[key] = undefined;
        } else {
          newState[key].count--;
        }
      });
      return newState;
    });
  };

  const setItem = async (key: string, value) => {
    await setState(prevState => {
      if (!prevState[key]) {
        return prevState;
      }
      return {
        ...prevState,
        [key]: {
          count: prevState[key].count,
          value
        }
      };
    });
    storage.setItem(key, value);
  };

  const removeItem = async (key: string) => {
    await setState(prevState => {
      if (!prevState[key]) {
        return prevState;
      }
      const newState = {
        ...prevState,
        [key]: {
          count: prevState[key].count,
          value: undefined
        }
      };
      return newState;
    });
    storage.removeItem(key);
  };

  const values = getValues();

  const storageValue: StorageValue = {
    subscribeItems,
    unsubscribeItems,
    setItem,
    removeItem,
    values
  };

  return <StorageContext.Provider value={storageValue}>{children}</StorageContext.Provider>;
};

export default StorageProvider;
