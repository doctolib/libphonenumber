#!/usr/bin/env bash

type mvn >/dev/null 2>&1 || echo '[ERROR] maven is not installed'
cd repositories/closure-compiler && mvn -DskipTests
