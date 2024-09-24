export interface StorageRepository<Data> {
    set<Namespace extends keyof Data, Key extends keyof Data[Namespace]>(payload: {
        namespace: Namespace;
        key: Key;
        value: Data[Namespace][Key];
    }): Promise<void>;
    get<Namespace extends keyof Data, Key extends keyof Data[Namespace]>(payload: {
        namespace: Namespace;
        key: Key;
    }): Promise<Data[Namespace][Key] | undefined>;
    remove<Namespace extends keyof Data, Key extends keyof Data[Namespace]>(payload: {
        namespace: Namespace;
        key: Key;
    }): Promise<void>;
    /**
     * No correct typing for key at this moment
     */
    multiRemove(
        payload: Partial<Record<keyof Data /** module aka namespace */, string[] /** array of deprecated key */>>,
    ): Promise<void>;
    clear(): Promise<void>;
}
