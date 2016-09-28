const test = require('tape');
const libphonenumber = require('..');

test('libphonenumber should export getSupportedCountries', t => {
  t.ok(libphonenumber.getSupportedCountries().find(({regionCode}) => regionCode === 'FR'));
  t.end();
});

test('libphonenumber should export parseRegionCode', t => {
  t.equals(libphonenumber.parseRegionCode('FR'), 'FR');
  t.equals(libphonenumber.parseRegionCode('FR', '060708'), 'FR');
  t.equals(libphonenumber.parseRegionCode('FR', '+4960708'), 'DE');
  t.end();
});

test('libphonenumber should export formatNumber', t => {
  t.equals(libphonenumber.formatNumber('FR', 'FR'), '');
  t.equals(libphonenumber.formatNumber('FR', 'FR', '+49'), '+49');
  t.equals(libphonenumber.formatNumber('FR', 'FR', '0607081011'), '06 07 08 10 11');
  t.equals(libphonenumber.formatNumber('DE', 'FR', '0607081011'), '+33 6 07 08 10 11');
  t.equals(libphonenumber.formatNumber('FR', 'FR', '+49607081011'), '+49 6070 81011');
  t.end();
});

test('libphonenumber should export formatInputNumber', t => {
  t.equals(libphonenumber.formatInputNumber('FR'), '');
  t.equals(libphonenumber.formatInputNumber('FR', '060708'), '06 07 08');
  t.equals(libphonenumber.formatInputNumber('FR', '+4960708'), '+49 6070 8');
  t.end();
});

test('libphonenumber should export isValidNumber', t => {
  t.equals(libphonenumber.isValidNumber('FR', '060811'), false);
  t.equals(libphonenumber.isValidNumber('FR', '0608115260'), true);
  t.equals(libphonenumber.isValidNumber('FR', '06081152601'), false);
  t.equals(libphonenumber.isValidNumber('FR', '+33608115260'), true);
  t.end();
});
