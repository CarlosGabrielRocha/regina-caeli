import parsePhoneNumberFromString, { isValidPhoneNumber } from "libphonenumber-js/mobile";

export function validatePhoneFormat(phone: string) {
  const phoneNumber = parsePhoneNumberFromString(phone)
  if (!phoneNumber || !isValidPhoneNumber(phoneNumber.number, "BR") || phoneNumber.country !== "BR") {
    return false;
  }

  return true;
}