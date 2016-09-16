# libphonenumber

Phone number internationalization interface using [libphonenumber](https://github.com/googlei18n/libphonenumber).

## Publishing

### Requirements

[Node](https://nodejs.org/en/), [Maven](https://maven.apache.org/) and [Ant](https://ant.apache.org/).

### Commands

```
# Install
npm run install::all && npm run build:all

# Update
npm run update::all && npm run build:all
```
## API

### libphonenumber.getSupportedRegionCodes(): String[];

List supported region codes.

### libphonenumber.getCountryCodeForRegionCode(regionCode: String): Number

Return country code for provided region code.

### libphonenumber.getRegionCodeForCountryCode(countryCode: Number): String

Return region code for provided country code.

### libphonenumber.getRegionCodeForNumber(currentRegionCode: String, number: String): String

Return region code from provided number or current region code.

### libphonenumber.formatNumber(currentRegionCode: String, number: String): String

Format number as a national one if number region is the current region, otherwise as an international none.

### libphonenumber.formatInputNumber(currentRegionCode: String, number: String): String

Try to format provided number as it is typed.
