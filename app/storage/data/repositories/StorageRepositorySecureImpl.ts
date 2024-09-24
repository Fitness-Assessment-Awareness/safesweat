import * as SecureStore from 'expo-secure-store';
import type { StorageRepository } from '../../domain/ports/StorageRepository';
import { MissingSecureStorageError } from '../entities/MissingSecureStorageError';
import type { StorageSecureData } from '../entities/StorageSecureData';
import { storageSecureDataCleanUpConfig } from '../entities/StorageSecureDataCleanUpConfig';

export class StorageRepositorySecureImpl implements StorageRepository<StorageSecureData> {
    static readonly #getStorageKey = (namespace: string, key: string) => `${namespace}.${key}`;

    static readonly #isSecureStorageAvailable = () => SecureStore.isAvailableAsync();

    public readonly set: StorageRepository<StorageSecureData>['set'] = async ({ namespace, key, value }) => {
        const isAvailable = await StorageRepositorySecureImpl.#isSecureStorageAvailable();
        if (!isAvailable) {
            throw new MissingSecureStorageError();
        }

        const storageKey: string = StorageRepositorySecureImpl.#getStorageKey(namespace, String(key));
        const stringifyValue = JSON.stringify(value);
        await SecureStore.setItemAsync(storageKey, stringifyValue, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
    };

    public readonly get: StorageRepository<StorageSecureData>['get'] = async ({ namespace, key }) => {
        const isAvailable = await StorageRepositorySecureImpl.#isSecureStorageAvailable();
        if (!isAvailable) {
            throw new MissingSecureStorageError();
        }

        const storageKey: string = StorageRepositorySecureImpl.#getStorageKey(namespace, String(key));
        const value = await SecureStore.getItemAsync(storageKey, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
        if (!value) {
            return undefined;
        }
        return JSON.parse(value);
    };

    public readonly remove: StorageRepository<StorageSecureData>['remove'] = async ({ namespace, key }) => {
        const isAvailable = await StorageRepositorySecureImpl.#isSecureStorageAvailable();
        if (!isAvailable) {
            throw new MissingSecureStorageError();
        }

        const storageKey: string = StorageRepositorySecureImpl.#getStorageKey(namespace, String(key));
        await SecureStore.deleteItemAsync(storageKey, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
    };

    public readonly multiRemove: StorageRepository<StorageSecureData>['multiRemove'] = async (map) => {
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

    public readonly clear: StorageRepository<StorageSecureData>['clear'] = async () => {
        await Promise.allSettled(
            Object.entries(storageSecureDataCleanUpConfig).flatMap(([namespace, keys]) =>
                Object.entries(keys).flatMap(([key, config]) => {
                    if (config.clear) {
                        // @ts-expect-error
                        return this.remove({ namespace, key });
                    }
                    return undefined;
                }),
            ),
        );
    };

    public readonly forceClear: StorageRepository<StorageSecureData>['forceClear'] = async () => {
        await Promise.allSettled(
            Object.entries(storageSecureDataCleanUpConfig).flatMap(([namespace, keys]) =>
                // @ts-expect-error
                Object.entries(keys).flatMap(([key]) => this.remove({ namespace, key })),
            ),
        );
    };
}
