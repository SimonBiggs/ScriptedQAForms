#!/bin/bash

cd angular-frontend
yarn install
ng build --no-aot --prod
cd ../
