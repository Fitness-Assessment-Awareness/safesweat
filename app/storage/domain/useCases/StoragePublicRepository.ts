import type { StoragePublicData } from '../../data/entities/StoragePublicData';
import { StorageRepositoryMMKVImpl } from '../../data/repositories/StorageRepositoryMMKVImpl';
import type { StorageRepository } from '../ports/StorageRepository';

export class StoragePublicRepository {
    static #instance: StorageRepository<StoragePublicData>;

    private constructor() {
        // NOTE: this is to prevent creating new instance using new keyword
    }

    static get instance() {
        if (StoragePublicRepository.#instance === undefined) {
            StoragePublicRepository.#instance = new StorageRepositoryMMKVImpl();
        }

        return StoragePublicRepository.#instance;
    }
}
