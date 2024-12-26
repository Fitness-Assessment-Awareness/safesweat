import { isPhoneNumber } from '../isPhoneNumber';

describe('isPhoneNumber', () => {
    it('should return true for valid Malaysian phone numbers', () => {
        expect(isPhoneNumber('+60123456789')).toBe(true);
        expect(isPhoneNumber('0123456789')).toBe(true);
        expect(isPhoneNumber('+6011-23456789')).toBe(true);
        expect(isPhoneNumber('011-23456789')).toBe(true);
    });

    it('should return false for invalid Malaysian phone numbers', () => {
        expect(isPhoneNumber('123456789')).toBe(false);
        expect(isPhoneNumber('+601234567890')).toBe(false);
        expect(isPhoneNumber('0112345678')).toBe(false);
        expect(isPhoneNumber('+601-23456789')).toBe(false);
        expect(isPhoneNumber('010-2345678')).toBe(true);
    });

    it('should return false for non-Malaysian phone numbers', () => {
        expect(isPhoneNumber('+11234567890')).toBe(false);
        expect(isPhoneNumber('00123456789')).toBe(false);
        expect(isPhoneNumber('+441234567890')).toBe(false);
    });
});
