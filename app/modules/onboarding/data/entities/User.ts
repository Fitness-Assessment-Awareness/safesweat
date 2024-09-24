import { Difficulty } from './Difficulty';
import { FocusArea } from './FocusArea';
import { Gender } from './Gender';
import { HealthProblem } from './HealthProblem';
import { WorkoutHistory } from './WorkoutHistory';

export interface User {
    gender: Gender;
    focusAreas: FocusArea[];
    difficulty: Difficulty;
    healthProblems: HealthProblem[];
    weight: number;
    height: number;
    workoutHistories: WorkoutHistory[];
}
