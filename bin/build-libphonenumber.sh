#!/usr/bin/env bash

type ant >/dev/null 2>&1 || echo '[ERROR] ant is not installed'
ant -f src/build.xml compile-libphonenumber
