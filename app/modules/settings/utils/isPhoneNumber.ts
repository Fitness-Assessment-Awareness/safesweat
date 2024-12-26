const phoneNumMalaysiaRegex = /^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/;

export function isPhoneNumber(phoneNumber: string) {
    return phoneNumMalaysiaRegex.test(phoneNumber);
}
