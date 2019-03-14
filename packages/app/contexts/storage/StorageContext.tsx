import React from 'react';

interface StorageContextProps {
  values: {
    [key: string]: string;
  };
  subscribeItems(keys: string[], callback?: () => void): void;
  setItem(key: string, value: any): void;
  removeItem(key: string): void;
}

export const StorageContext = React.createContext<StorageContextProps>({
  values: {},
  subscribeItems: () => {
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
