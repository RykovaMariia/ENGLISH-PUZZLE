class StorageService<T> {
  constructor(private storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  saveData<K extends keyof T>(key: K, data: T[K]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  getData<K extends keyof T>(key: K, validate?: (data: unknown) => data is T[K]): T[K] | null {
    const storageKey = this.getStorageKey(key.toString());
    const data = localStorage.getItem(storageKey);

    if (data === null) {
      return null;
    }
    try {
      const result: unknown = JSON.parse(data);
      if (validate) {
        return validate(result) ? result : null;
      }
      return result as T[K];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
}

export type LocalStorageState = {
  userFullName: UserFullName;
  puzzleHint: boolean;
};

interface UserFullName {
  firstName: string;
  surname: string;
}

export const localStorageService = new StorageService<LocalStorageState>('PUZZLE_RM');
