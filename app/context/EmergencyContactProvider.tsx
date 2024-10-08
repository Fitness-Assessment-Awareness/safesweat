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
import { EMERGENCY_CONTACT_MALAYSIA } from '../modules/settings/constant/EmergencyContactMalaysia';
import { EmergencyContact } from '../modules/settings/data/entities/EmergencyContact';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

const EmergencyContactsContext = createContext<{
    emergencyContacts: EmergencyContact[];
    setEmergencyContacts: Dispatch<SetStateAction<EmergencyContact[]>>;
} | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function EmergencyContactsProvider({ children }: ComponentProps) {
    const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

    const setEmergencyContactsInternal = useCallback(
        (payload: SetStateAction<EmergencyContact[]>) => {
            if (typeof payload === 'function') {
                setEmergencyContacts((prevEmergencyContacts) => {
                    const newEmergencyContacts = payload(prevEmergencyContacts);
                    StoragePublicRepository.instance.set({
                        namespace: 'settings',
                        key: 'emergencyContacts',
                        value: newEmergencyContacts,
                    });
                    return newEmergencyContacts;
                });
            } else {
                setEmergencyContacts(payload);
                StoragePublicRepository.instance.set({
                    namespace: 'settings',
                    key: 'emergencyContacts',
                    value: payload,
                });
            }
        },
        [setEmergencyContacts],
    );

    useEffect(() => {
        const rehydrateEmergencyContacts = async () => {
            const storedEmergencyContacts = await StoragePublicRepository.instance.get({
                namespace: 'settings',
                key: 'emergencyContacts',
            });

            if (storedEmergencyContacts) {
                setEmergencyContacts(storedEmergencyContacts);
            } else {
                setEmergencyContactsInternal([
                    {
                        ...EMERGENCY_CONTACT_MALAYSIA,
                    },
                ]);
            }
        };

        rehydrateEmergencyContacts();
    }, [setEmergencyContactsInternal]);

    const value = useMemo(
        () => ({ emergencyContacts, setEmergencyContacts: setEmergencyContactsInternal }),
        [emergencyContacts, setEmergencyContactsInternal],
    );

    return <EmergencyContactsContext.Provider value={value}>{children}</EmergencyContactsContext.Provider>;
}

export function useEmergencyContacts() {
    const context = useContext(EmergencyContactsContext);

    if (!context) {
        throw new Error('useEmergencyContacts must be used within a EmergencyContactsProvider');
    }

    const { emergencyContacts, setEmergencyContacts } = context;

    const updateEmergencyContact = useCallback(
        (id: string, update: Partial<EmergencyContact>) => {
            setEmergencyContacts((prevEmergencyContacts) =>
                prevEmergencyContacts.map((emergencyContact) =>
                    emergencyContact.id === id ? { ...emergencyContact, ...update } : emergencyContact,
                ),
            );
        },
        [setEmergencyContacts],
    );

    return { emergencyContacts, updateEmergencyContact, setEmergencyContacts };
}
