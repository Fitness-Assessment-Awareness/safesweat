// eslint-disable-next-line no-restricted-imports
import { MMKV } from 'react-native-mmkv';
import type { StorageRepository } from '../../domain/ports/StorageRepository';
import { type StoragePublicData } from '../entities/StoragePublicData';

export class StorageRepositoryMMKVImpl implements StorageRepository<StoragePublicData> {
    static readonly #getStorageKey = (namespace: string, key: string) => `${namespace}.${key}`;

    /**
     * To create a new instance of the MMKV storage, use the MMKV constructor.
     * It is recommended that you re-use this instance throughout your entire app
     * instead of creating a new instance each time, so export the storage object.
     *
     * @see https://github.com/mrousavy/react-native-mmkv#create-a-new-instance
     */
    static readonly #mmkv = new MMKV();

    public readonly set: StorageRepository<StoragePublicData>['set'] = async ({ namespace, key, value }) => {
        const storageKey: string = StorageRepositoryMMKVImpl.#getStorageKey(namespace, String(key));
        const stringifyValue = JSON.stringify(value);
        StorageRepositoryMMKVImpl.#mmkv.set(storageKey, stringifyValue);
    };

    public readonly get: StorageRepository<StoragePublicData>['get'] = async ({ namespace, key }) => {
        const storageKey: string = StorageRepositoryMMKVImpl.#getStorageKey(namespace, String(key));
        // StorageRepositoryMMKVImpl.#mmkv.getString() might return undefined
        const value = StorageRepositoryMMKVImpl.#mmkv.getString(storageKey);
        if (!value) {
            return undefined;
        }
        return JSON.parse(value);
    };

    public readonly remove: StorageRepository<StoragePublicData>['remove'] = async ({ namespace, key }) => {
        const storageKey: string = StorageRepositoryMMKVImpl.#getStorageKey(namespace, String(key));
        StorageRepositoryMMKVImpl.#mmkv.delete(storageKey);
    };

    public readonly multiRemove: StorageRepository<StoragePublicData>['multiRemove'] = async (map) => {
        await Promise.allSettled(
            Object.entries(map).flatMap(([namespace, keys]) =>
                keys.flatMap((key) =>
                    this.remove({
                        // @ts-expect-error
                        namespace,
                        // @ts-expect-error
                        key,
                    }),
                ),
            ),
        );
    };

    public readonly clear: StorageRepository<StoragePublicData>['clear'] = async () => {
        StorageRepositoryMMKVImpl.#mmkv.clearAll();
    };
}
