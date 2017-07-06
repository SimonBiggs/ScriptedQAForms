# Copyright (C) 2016 Simon Biggs
# This program is free software: you can redistribute it and/or
# modify it under the terms of the GNU Affero General Public
# License as published by the Free Software Foundation, either
# version 3 of the License, or (at your option) any later version.
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# Affero General Public License for more details.
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# http://www.gnu.org/licenses/.

"""ScriptedForms"""

import sys
import os
import webbrowser

import tornado.web
from traitlets import Unicode

from notebook.notebookapp import NotebookApp
from notebook.base.handlers import IPythonHandler

class Angular(IPythonHandler):
    """Angular"""
    def get(self):
        """Angular"""

        self.render("index.html")


class ScriptedForms(NotebookApp):

    default_url = Unicode('/forms/')

    def start(self):    
        dev_mode_string = os.getenv('DEVMODE')
        
        if dev_mode_string == "True":
            dev_mode = True
        else:
            dev_mode = False
            
        if dev_mode:
            static_directory = "./angular-frontend/dist"
        else:
            static_directory = os.path.join(sys._MEIPASS, 'angular')  
       
        handlers = [
            ('/forms/assets/(.*)', tornado.web.StaticFileHandler, dict(
                path=os.path.join(static_directory, 'assets'))),
            (r'/forms/(styles.*\.bundle\.css)', tornado.web.StaticFileHandler, dict(
                path=static_directory)),
            (r'/forms/(inline.*\.bundle\.js)', tornado.web.StaticFileHandler, dict(
                path=static_directory)),
            (r'/forms/(vendor.*\.bundle\.js)', tornado.web.StaticFileHandler, dict(
                path=static_directory)),
            (r'/forms/(polyfills.*\.bundle\.js)', tornado.web.StaticFileHandler, dict(
                path=static_directory)),
            (r'/forms/(main.*\.bundle\.js)', tornado.web.StaticFileHandler, dict(
                path=static_directory)),
            ('/forms/.*', Angular)
        ]
        
        self.web_app.add_handlers(".*$", handlers)
        self.web_app.settings['debug'] = dev_mode
        self.web_app.settings['template_path'] = static_directory
        self.web_app.settings['static_path'] = static_directory
        
        super(ScriptedForms, self).start()


if __name__ == "__main__":
    ScriptedForms.launch_instance()
