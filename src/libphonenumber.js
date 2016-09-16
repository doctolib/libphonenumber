goog.require('i18n.phonenumbers.PhoneNumber');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

function getSupportedRegionCodes() {
 return i18n.phonenumbers.PhoneNumberUtil
   .getInstance()
   .getSupportedRegions();
}

function getCountryCodeForRegionCode(regionCode) {
 return i18n.phonenumbers.PhoneNumberUtil
   .getInstance()
   .getCountryCodeForRegion(regionCode);
}

function getRegionCodeForCountryCode(countryCode) {
  return i18n.phonenumbers.PhoneNumberUtil
    .getInstance()
    .getRegionCodeForCountryCode(countryCode);
}

function parseCountryCode(currentRegionCode, number) {
  var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  try {
    return phoneUtil
      .parse(number, currentRegionCode)
      .getCountryCodeOrDefault();
  } catch (err) {
    return phoneUtil.getCountryCodeForRegion(currentRegionCode);
  }
}

function formatNumber(currentRegionCode, number) {
  var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  try {
    var phoneNumber = phoneUtil.parse(number, currentRegionCode);
    var currentCountryCode = phoneUtil.getCountryCodeForRegion(currentRegionCode);
    return phoneUtil.format(
      phoneNumber,
      phoneNumber.getCountryCodeOrDefault() === currentCountryCode
        ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL
        : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL
    );
  } catch (err) {
    return number;
  }
}

function formatInputNumber(regionCode, number) {
  var formatter = new i18n.phonenumbers.AsYouTypeFormatter(regionCode);
  try {
    return Array.from(number).reduce(function (output, char) {
      return formatter.inputDigit(char);
    }, '');
  } catch (err) {
    return number;
  }
}

goog.exportSymbol('getSupportedRegionCodes', getSupportedRegionCodes);
goog.exportSymbol('getCountryCodeForRegionCode', getCountryCodeForRegionCode);
goog.exportSymbol('getRegionCodeForCountryCode', getRegionCodeForCountryCode);
goog.exportSymbol('parseCountryCode', parseCountryCode);
goog.exportSymbol('formatNumber', formatNumber);
goog.exportSymbol('formatInputNumber', formatInputNumber);
