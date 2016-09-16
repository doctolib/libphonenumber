const test = require('tape');
const libphonenumber = require('..');

test('libphonenumber should export getSupportedRegionCodes', t => {
  t.ok(libphonenumber.getSupportedRegionCodes().find(regionCode => regionCode === 'FR'));
  t.end();
});

test('libphonenumber should export getCountryCodeForRegionCode', t => {
  t.equals(libphonenumber.getCountryCodeForRegionCode('FR'), 33);
  t.end();
});

test('libphonenumber should export getRegionCodeForCountryCode', t => {
  t.equals(libphonenumber.getRegionCodeForCountryCode(33), 'FR');
  t.end();
});

test('libphonenumber should export parseCountryCode', t => {
  t.equals(libphonenumber.parseCountryCode('FR'), 33);
  t.equals(libphonenumber.parseCountryCode('FR', '060708'), 33);
  t.equals(libphonenumber.parseCountryCode('FR', '+4960708'), 49);
  t.end();
});

test('libphonenumber should export formatNumber', t => {
  t.equals(libphonenumber.formatNumber('FR'), undefined);
  t.equals(libphonenumber.formatNumber('FR', '0607081011'), '06 07 08 10 11');
  t.equals(libphonenumber.formatNumber('FR', '+49607081011'), '+49 6070 81011');
  t.end();
});

test('libphonenumber should export formatInputNumber', t => {
  t.equals(libphonenumber.formatInputNumber('FR'), undefined);
  t.equals(libphonenumber.formatInputNumber('FR', '060708'), '06 07 08');
  t.equals(libphonenumber.formatInputNumber('FR', '+4960708'), '+49 6070 8');
  t.end();
});
