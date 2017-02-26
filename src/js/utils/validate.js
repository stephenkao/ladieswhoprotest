const EMAIL_REGEX = new RegExp([
  '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>(),[\\]\\.,;:\\s@\\"]+)*)',
  '|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
  '[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+',
  '[a-zA-Z]{2,}))$'
].join(''));

const ZIPCODE_REGEX = /\d{5}/;

export function isValidEmail(emailString) {
  return EMAIL_REGEX.test(emailString || '');
}

export function isValidZipcode(zipString) {
  return ZIPCODE_REGEX.test(zipString || '');
}

export function sanitizeReason(reason) {
  if (!reason) {
    return null;
  }
  return reason.replace(/[\n\r\t]/g, ' ');
}

