const test = require('tape');
const intlPhoneNumber = require('..');

test('intlPhoneNumber should export format types', t => {
    t.equal(typeof intlPhoneNumber.FORMAT_E164, 'number');
    t.equal(typeof intlPhoneNumber.FORMAT_INTERNATIONAL, 'number');
    t.equal(typeof intlPhoneNumber.FORMAT_NATIONAL, 'number');
    t.equal(typeof intlPhoneNumber.FORMAT_RFC3966, 'number');
    t.end()
});

test('intlPhoneNumber should export supported (region, code) tuples', t => {
    const fr = intlPhoneNumber.supported.find(({region}) => region === 'FR');
    t.equal(fr.code, 33);
    t.end()
});

test('intlPhoneNumber should export parse method', t => {
  const {code, number, region} = intlPhoneNumber.parse('DE', '+33608611242');
  t.equals(code, 33);
  t.equals(number, 608611242);
  t.equals(region, 'FR');
  t.end();
});

test('intlPhoneNumber should export parse method with defaults', t => {
  const {code, number, region} = intlPhoneNumber.parse('DE', '6086112');
  t.equals(code, 49);
  t.equals(number, 6086112);
  t.equals(region, 'DE');
  t.end();
});


test('intlPhoneNumber should export format method', t => {
  const parsed = intlPhoneNumber.parse('DE', '+33608611242');
  t.equals(intlPhoneNumber.format(null, parsed), '+33608611242');
  t.equals(intlPhoneNumber.format(intlPhoneNumber.FORMAT_INTERNATIONAL, parsed), '+33 6 08 61 12 42');
  t.equals(intlPhoneNumber.format(intlPhoneNumber.FORMAT_NATIONAL, parsed), '06 08 61 12 42');
  t.equals(intlPhoneNumber.format(intlPhoneNumber.FORMAT_RFC3966, parsed), 'tel:+33-6-08-61-12-42');
  t.end();
});
