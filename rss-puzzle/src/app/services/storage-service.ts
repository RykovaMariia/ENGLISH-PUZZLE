class StorageService<T> {
  constructor(private storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  saveData<K extends keyof T>(key: K, data: T[K]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  removeData<K extends keyof T>(key: K): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.removeItem(storageKey);
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

  toggleData<K extends keyof T>(key: K, data: T[K]): void {
    if (this.getData(key)) {
      this.removeData(key);
    } else {
      this.saveData(key, data);
    }
  }
}

export type LocalStorageState = {
  userFullName: UserFullName;
  translateHint: string;
  puzzleHint: string;
  audioHint: string;
  completedLevels: string[];
  completedRounds: CompletedRounds[];
};

interface UserFullName {
  firstName: string;
  surname: string;
}

export interface CompletedRounds {
  level: string;
  rounds: string[];
}

export const localStorageService = new StorageService<LocalStorageState>('PUZZLE_RM');
