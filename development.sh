#!/bin/bash

cd angular-frontend
ng serve
cd ../

rm -rf build dist
export DEBUG="True"
export NAME="ScriptedQAForms_dev"
wine ~/.wine/drive_c/python35/Scripts/pyinstaller.exe --onefile python-server/build.spec


wine ./dist/ScriptedQAForms_dev.exe

