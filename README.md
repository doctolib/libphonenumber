# libphonenumber

Phone number internationalization interface using [libphonenumber](https://github.com/googlei18n/libphonenumber).

## Requirements

[Node](https://nodejs.org/en/), [Maven](https://maven.apache.org/) and [Ant](https://ant.apache.org/).

## Install

```bash
# Install
npm install && npm run install::all && npm run build:all
```

## Update
```bash
npm run update::all && npm run build:all
```

## API

```javascript
libphonenumber.getSupportedRegionCodes(): String[]
```

List supported region codes.

```javascript
libphonenumber.getCountryCodeForRegionCode(regionCode: String): Number
```

Return country code for provided region code.

```javascript
libphonenumber.getRegionCodeForCountryCode(countryCode: Number): String
```

Return region code for provided country code.

```javascript
libphonenumber.parseCountryCode(currentRegionCode: String, number: String): String
```

Return region code from provided number or current region code.

```javascript
libphonenumber.formatNumber(currentRegionCode: String, number: String): String
```

Format number as a national one if number region is the current region, otherwise as an international none.

```javascript
libphonenumber.formatInputNumber(currentRegionCode: String, number: String): String
```

Try to format provided number as it is typed.
