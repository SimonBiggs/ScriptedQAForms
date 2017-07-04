#!/bin/bash

cd angular-frontend
yarn install
ng build --prod
cd ../

export DEVMODE="True"
wine ~/.wine/drive_c/python35/python.exe python-server/open_dev_address.py
wine ~/.wine/drive_c/python35/python.exe python-server/ScriptedQAForms.py


