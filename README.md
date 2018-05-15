# libphonenumber

Phone number internationalization interface using [libphonenumber](https://github.com/googlei18n/libphonenumber).

## Requirements

[Node](https://nodejs.org/en/), Java, [Maven](https://maven.apache.org/) and [Ant](https://ant.apache.org/).

## Install

```bash
# Install
npm install && npm run install:all && npm run build:all
```

## Update

```bash
npm run update:all && npm run build:all
```

## API

```javascript
libphonenumber.getSupportedRegionCodes(): [{regionCode, countryCode}]
```

List supported region codes.

```javascript
libphonenumber.parseRegionCode(regionCode: String, number: String): String
```

Return region code from provided number or current region code.

```javascript
libphonenumber.isValidNumber(regionCode: String, number: String): Boolean
```

Return true if phone number is valid for regionCode.

```javascript
libphonenumber.injectCountryCode(defaultRegionCode: String, regionCode: String, number: String): Boolean
```

Replace or inject number countryCode.

```javascript
libphonenumber.formatNumber(defaultRegionCode: String, regionCode: String, number: String): String
```

Format number as a national one if number region is the current region, otherwise as an international none.

```javascript
libphonenumber.formatInputNumber(regionCode: String, number: String): String
```

Try to format provided number as it is typed.
