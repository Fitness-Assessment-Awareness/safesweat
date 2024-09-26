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
import { AssessmentResult } from '../modules/onboarding/data/entities/AssessmentResult';
import { Difficulty } from '../modules/onboarding/data/entities/Difficulty';
import { Gender } from '../modules/onboarding/data/entities/Gender';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

const AssessmentResultContext = createContext<{
    assessmentResult: AssessmentResult;
    setAssessmentResult: Dispatch<SetStateAction<AssessmentResult>>;
} | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function AssessmentResultProvider({ children }: ComponentProps) {
    const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>({
        gender: Gender.Male,
        focusAreas: [],
        difficulty: Difficulty.NONE,
        healthProblems: [],
        weight: 50,
        height: 160,
        workoutHistories: [],
    });

    useEffect(() => {
        const rehydrateAssessmentResult = async () => {
            const storedAssessmentResult = await StoragePublicRepository.instance.get({
                namespace: 'onboarding',
                key: 'assessmentResult',
            });

            if (storedAssessmentResult) {
                setAssessmentResult(storedAssessmentResult);
            }
        };

        rehydrateAssessmentResult();
    }, []);

    const setAssessmentResultInternal = useCallback(
        (payload: SetStateAction<AssessmentResult>) => {
            if (typeof payload === 'function') {
                setAssessmentResult((prevAssessmentResult) => {
                    const newAssessmentResult = payload(prevAssessmentResult);
                    StoragePublicRepository.instance.set({
                        namespace: 'onboarding',
                        key: 'assessmentResult',
                        value: newAssessmentResult,
                    });
                    return { ...prevAssessmentResult, ...newAssessmentResult };
                });
            } else {
                setAssessmentResult(payload);
                StoragePublicRepository.instance.set({
                    namespace: 'onboarding',
                    key: 'assessmentResult',
                    value: payload,
                });
            }
        },
        [setAssessmentResult],
    );

    const value = useMemo(
        () => ({ assessmentResult, setAssessmentResult: setAssessmentResultInternal }),
        [assessmentResult, setAssessmentResultInternal],
    );

    return <AssessmentResultContext.Provider value={value}>{children}</AssessmentResultContext.Provider>;
}

export function useAssessmentResult() {
    const context = useContext(AssessmentResultContext);

    if (!context) {
        throw new Error('useAssessmentResult must be used within a AssessmentResultProvider');
    }

    const { assessmentResult, setAssessmentResult } = context;

    const updateAssessmentResult = useCallback(
        (update: Partial<AssessmentResult>) => {
            setAssessmentResult({ ...assessmentResult, ...update });
        },
        [setAssessmentResult, assessmentResult],
    );

    return { assessmentResult, updateAssessmentResult, setAssessmentResult };
}
