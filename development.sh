#!/bin/bash

export DEVMODE="True"
wine ~/.wine/drive_c/python35/python.exe python-server/open_dev_address.py
wine ~/.wine/drive_c/python35/python.exe python-server/ScriptedQAForms.py &

cd angular-frontend
ng serve


