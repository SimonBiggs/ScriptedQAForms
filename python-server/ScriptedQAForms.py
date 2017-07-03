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

"""ScriptedQAForms"""

import sys
import os
import socket
import webbrowser

import tornado.ioloop
import tornado.web

class Angular(tornado.web.RequestHandler):
    """Angular"""

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header('Access-Control-Allow-Methods', 'GET')

    def get(self):
        """Angular"""

        self.render("index.html")


def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)


def main():
    settings = {
        'debug': True,
        'template_path': resource_path("angular"),
        'static_url_prefix': "/angular/",
        'static_path': resource_path("angular")}
    
    handlers = [
        ('/', Angular)]
    
    app = tornado.web.Application(handlers, **settings)
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 1))
        hostname = s.getsockname()[0]
    except:
        hostname = socket.gethostbyname(socket.gethostname())
        
    
    port = int(os.environ.get("PORT", 5000))
    
    while True:
        try:
            app.listen(port)
            break
        except:
            port += 1

    webbrowser.open('http://{}:{}'.format(hostname, port))
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
