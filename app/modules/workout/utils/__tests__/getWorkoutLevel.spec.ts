import { Difficulty } from '../../../onboarding/data/entities/Difficulty';
import { getWorkoutLevel } from '../getWorkoutLevel';

describe('getWorkoutLevel', () => {
    it('should return Beginner for workoutPoints less than 15', () => {
        expect(getWorkoutLevel(10)).toBe(Difficulty.Beginner);
    });

    it('should return Intermediate for workoutPoints between 15 and 29', () => {
        expect(getWorkoutLevel(20)).toBe(Difficulty.Intermediate);
    });

    it('should return Advanced for workoutPoints 30 or more', () => {
        expect(getWorkoutLevel(30)).toBe(Difficulty.Advanced);
    });

    it('should return Beginner for workoutPoints equal to 0', () => {
        expect(getWorkoutLevel(0)).toBe(Difficulty.Beginner);
    });

    it('should return Intermediate for workoutPoints equal to 15', () => {
        expect(getWorkoutLevel(15)).toBe(Difficulty.Intermediate);
    });

    it('should return Advanced for workoutPoints equal to 50', () => {
        expect(getWorkoutLevel(50)).toBe(Difficulty.Advanced);
    });
});
