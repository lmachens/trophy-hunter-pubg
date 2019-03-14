export interface StorageValue {
  values: {
    [key: string]: string;
  };
  subscribeItems(keys: [string]): void;
  setItem(key: string, value: any): void;
  removeItem(key: string): void;
}
