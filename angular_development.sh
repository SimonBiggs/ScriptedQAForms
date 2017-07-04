#!/bin/bash

python python-server/open_dev_address.py

cd angular-frontend
yarn install
ng serve --port 5000


