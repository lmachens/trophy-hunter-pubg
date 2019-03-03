import React from 'react';

interface StorageContextProps {
  values: {
    [key: string]: string;
  };
  subscribeItems(keys: string[], callback?: () => void): void;
  unsubscribeItems(keys: string[]): void;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const StorageContext = React.createContext<StorageContextProps>({
  values: {},
  subscribeItems: () => {
    return;
  },
  unsubscribeItems: () => {
    return;
  },
  setItem: () => {
    return;
  },
  removeItem: () => {
    return;
  }
});
export default StorageContext;
