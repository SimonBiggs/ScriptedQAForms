#!/bin/bash

cd angular-frontend
ng build --prod
cd ../
wine ~/.wine/drive_c/python35/Scripts/pyinstaller.exe --onefile python-server/hello_world.spec


wine ./dist/hello_world.exe

