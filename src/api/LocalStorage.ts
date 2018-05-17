export default class LocalStorage {
    public static storeObject(key, value): void {
        localStorage.setItem(key, JSON.stringify(value))
    }
    public static getObject<T>(key): T {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value) as T;
        }

        return null;
    }
}
