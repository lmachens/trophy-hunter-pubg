export interface StorageValue {
  values: {
    [key: string]: string;
  };
  subscribeItems(keys: [string]): void;
  unsubscribeItems(keys: [string]): void;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
