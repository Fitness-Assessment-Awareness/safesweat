import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { LanguageCode } from '../lang/LanguageCode';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

const LanguageCodeContext = createContext<{
    languageCode: LanguageCode;
    setLanguageCode: Dispatch<SetStateAction<LanguageCode>>;
} | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function LanguageCodeProvider({ children }: ComponentProps) {
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageCode.ENGLISH);

    const setLanguageCodeInternal = useCallback(
        (payload: SetStateAction<LanguageCode>) => {
            if (typeof payload === 'function') {
                setLanguageCode((prevLanguageCode) => {
                    const newLanguageCode = payload(prevLanguageCode);
                    StoragePublicRepository.instance.set({
                        namespace: 'settings',
                        key: 'languageCode',
                        value: newLanguageCode,
                    });
                    i18next.changeLanguage(newLanguageCode);
                    return newLanguageCode;
                });
            } else {
                setLanguageCode(payload);
                StoragePublicRepository.instance.set({
                    namespace: 'settings',
                    key: 'languageCode',
                    value: payload,
                });
                i18next.changeLanguage(payload);
            }
        },
        [setLanguageCode],
    );

    useEffect(() => {
        const rehydrateLanguageCode = async () => {
            const storedLanguageCode = await StoragePublicRepository.instance.get({
                namespace: 'settings',
                key: 'languageCode',
            });

            if (storedLanguageCode) {
                setLanguageCode(storedLanguageCode);
                i18next.changeLanguage(storedLanguageCode);
            } else {
                setLanguageCodeInternal(
                    getLocales()[0].languageCode === LanguageCode.MELAYU ? LanguageCode.MELAYU : LanguageCode.ENGLISH,
                );
            }
        };

        rehydrateLanguageCode();
    }, [setLanguageCodeInternal]);

    const value = useMemo(
        () => ({ languageCode, setLanguageCode: setLanguageCodeInternal }),
        [languageCode, setLanguageCodeInternal],
    );

    return <LanguageCodeContext.Provider value={value}>{children}</LanguageCodeContext.Provider>;
}

export function useLanguageCode() {
    const context = useContext(LanguageCodeContext);

    if (!context) {
        throw new Error('useLanguageCode must be used within a LanguageCodeProvider');
    }

    const { languageCode, setLanguageCode } = context;

    return { languageCode, setLanguageCode };
}
