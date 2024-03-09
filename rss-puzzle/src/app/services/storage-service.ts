const KEY_PREFIX = 'rm';

export class StorageService {
  static saveData(key: string, data: unknown): void {
    const storageKey = `${KEY_PREFIX}_${key}`;

    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  static getData(key: string) {
    const storageKey = `${KEY_PREFIX}_${key}`;

    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
}
