import { createContext } from 'react';
import { Difficulty } from '../modules/onboarding/data/Difficulty';
import { FocusArea } from '../modules/onboarding/data/FocusArea';
import { Gender } from '../modules/onboarding/data/Gender';
import { HealthProblem } from '../modules/onboarding/data/HealthProblem';

export type User = {
    gender: Gender;
    focusAreas: FocusArea[];
    difficulty: Difficulty;
    healthProblems: HealthProblem[];
    weight: number;
    height: number;
};

export const UserContext = createContext<{ user: User; setUser: (u: User) => void } | null>(null);
