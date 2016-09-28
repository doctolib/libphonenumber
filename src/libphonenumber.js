// goog.require('i18n.phonenumbers.PhoneNumber');
// goog.require('i18n.phonenumbers.PhoneNumberUtil');
// goog.require('i18n.phonenumbers.PhoneNumberFormat');
// goog.require('i18n.phonenumbers.AsYouTypeFormatter');
// 
// function getSupportedRegionCodes() {
//  return i18n.phonenumbers.PhoneNumberUtil
//    .getInstance()
//    .getSupportedRegions();
// }
// 
// function getCountryCodeForRegionCode(regionCode) {
//  return i18n.phonenumbers.PhoneNumberUtil
//    .getInstance()
//    .getCountryCodeForRegion(regionCode);
// }
// 
// function getRegionCodeForCountryCode(countryCode) {
//   return i18n.phonenumbers.PhoneNumberUtil
//     .getInstance()
//     .getRegionCodeForCountryCode(countryCode);
// }
// 
// function parseCountryCode(currentRegionCode, number) {
//   var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//   try {
//     return phoneUtil
//       .parse(number, currentRegionCode)
//       .getCountryCodeOrDefault();
//   } catch (err) {
//     return phoneUtil.getCountryCodeForRegion(currentRegionCode);
//   }
// }
// 
// function formatNumber(currentRegionCode, number) {
//   var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//   try {
//     var phoneNumber = phoneUtil.parse(number, currentRegionCode);
//     var currentCountryCode = phoneUtil.getCountryCodeForRegion(currentRegionCode);
//     return phoneUtil.format(
//       phoneNumber,
//       phoneNumber.getCountryCodeOrDefault() === currentCountryCode
//         ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL
//         : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL
//     );
//   } catch (err) {
//     return number;
//   }
// }
// 
// function formatInputNumber(regionCode, number) {
//   var formatter = new i18n.phonenumbers.AsYouTypeFormatter(regionCode);
//   try {
//     return Array.from(number).reduce(function (output, char) {
//       return formatter.inputDigit(char);
//     }, '');
//   } catch (err) {
//     return number;
//   }
// }
// 
// goog.exportSymbol('getSupportedRegionCodes', getSupportedRegionCodes);
// goog.exportSymbol('getCountryCodeForRegionCode', getCountryCodeForRegionCode);
// goog.exportSymbol('getRegionCodeForCountryCode', getRegionCodeForCountryCode);
// goog.exportSymbol('parseCountryCode', parseCountryCode);
// goog.exportSymbol('formatNumber', formatNumber);
// goog.exportSymbol('formatInputNumber', formatInputNumber);
// goog.exportSymbol('test', function (regionCode, number) {
//   // var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//   // var phoneNumber = phoneUtil.parse(number, regionCode);
//   // phoneNumber.setCountryCode(phoneUtil.getCountryCodeForRegion(regionCode));
//   // return phoneUtil.format(phoneNumber, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
//   var phoneNumber = new i18n.phonenumbers.PhoneNumber();
//   phoneNumber.setCountryCode(phoneUtil.getCountryCodeForRegion(regionCode));
//   
// });

goog.require('goog.string.StringBuffer');
goog.require('i18n.phonenumbers.PhoneNumber');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

// goog.exportSymbol('StringBuffer', goog.string.StringBuffer);
// goog.exportSymbol('PhoneNumber', i18n.phonenumbers.PhoneNumber);
// goog.exportSymbol('PhoneNumberUtil', i18n.phonenumbers.PhoneNumberUtil);
// goog.exportSymbol('PhoneNumberFormat', i18n.phonenumbers.PhoneNumberFormat);
// goog.exportSymbol('AsYouTypeFormatter', i18n.phonenumbers.AsYouTypeFormatter);

// phoneNumberUtil.maybeExtractCountryCode('+130', phoneNumberUtil.getMetadataForRegion('FR'), new lib.StringBuffer(), true, new lib.PhoneNumber);

/*

Typing
  maybeExtractCountryCode
    error
      do nothing
    0
      set current country code
    other
      set country code
    formatAsYouType

Change country
  maybeExtractCountryCode
    error
      create phone number (country, nationalphonenumber: value)
    0
      set current country code and replace all
    other
      update PhoneNumber countr countryCode
    format as you type
 */

function sanitize(value) {
  return (value || '').replace(/\s+/g, '');
}

function parseNumber(regionCode, number) {
  number = sanitize(number);
  var phoneNumber = new i18n.phonenumbers.PhoneNumber();
  var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  var nationalNumber = new goog.string.StringBuffer();
  var countryCode = phoneNumberUtil.maybeExtractCountryCode(
    number,
    phoneNumberUtil.getMetadataForRegion(regionCode),
    nationalNumber,
    true,
    phoneNumber);
  if (!countryCode) {
    phoneNumber.setCountryCode(phoneNumberUtil.getCountryCodeForRegion(regionCode));
  }
  phoneNumber.setNationalNumber(Number(nationalNumber.toString() || number));
  
  return phoneNumber;
}

function parseRegionCode(regionCode, number) {
  try {
    return i18n.phonenumbers.PhoneNumberUtil
      .getInstance()
      .getRegionCodeForCountryCode(parseNumber(regionCode, number).getCountryCode());
  } catch (err) {
    return regionCode;
  }
}

function isValidNumber(regionCode, number) {
  try {
    return Boolean(!number)
      || i18n.phonenumbers.PhoneNumberUtil
        .getInstance()
        .isValidNumber(parseNumber(regionCode, number));
  } catch (err) {
    return false;
  }
}

function injectCountryCode(defaultRegionCode, regionCode, number) {
  var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  var countryCode = phoneNumberUtil.getCountryCodeForRegion(regionCode);
  try {
    var phoneNumber = parseNumber(regionCode, number);
    if (countryCode !== phoneNumber.getCountryCode()) {
      phoneNumber.setCountryCode(countryCode);
    }
    return formatNumber(defaultRegionCode, regionCode, phoneNumber);
  } catch (err) {
    var phoneNumber = new i18n.phonenumbers.PhoneNumber();
    phoneNumber.setCountryCode(countryCode);
    phoneNumber.setNationalNumber(0);
    return formatNumber(defaultRegionCode, regionCode, phoneNumber);
  }
}

function getSupportedCountries() {
  var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  return phoneNumberUtil
    .getSupportedRegions()
    .map(function (regionCode) {
      return {
        ['regionCode']: regionCode,
        ['countryCode']: phoneNumberUtil.getCountryCodeForRegion(regionCode),
      };
    });
}

function formatNumber(defaultRegionCode, regionCode, number) {
  var phoneNumberUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  try {
    var phoneNumber = number instanceof i18n.phonenumbers.PhoneNumber
      ? number : parseNumber(regionCode, number);
    var formatterNumber = phoneNumberUtil.format(
      phoneNumber,
      phoneNumberUtil.getRegionCodeForCountryCode(phoneNumber.getCountryCode()) === defaultRegionCode
        ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL
        : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
    if (phoneNumber.hasCountryCode() && 0 === phoneNumber.getNationalNumber().valueOf()) {
      return formatterNumber.replace(/0$/, '');
    }
    return formatterNumber;
  } catch (err) {
    return number;
  }
}

function formatInputNumber(regionCode, number) {
  number = sanitize(number);
  try {
    var formatter = new i18n.phonenumbers.AsYouTypeFormatter(regionCode);
    return Array.from(number).reduce(function (_, char) {
      return formatter.inputDigit(char);
    }, '');
  } catch (err) {
    return number;
  }
}

goog.exportSymbol('formatNumber', formatNumber);
goog.exportSymbol('formatInputNumber', formatInputNumber);
goog.exportSymbol('getSupportedCountries', getSupportedCountries);
goog.exportSymbol('injectCountryCode', injectCountryCode);
goog.exportSymbol('isValidNumber', isValidNumber);
goog.exportSymbol('parseRegionCode', parseRegionCode);
