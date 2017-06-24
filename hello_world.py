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

import os
import webbrowser

import tornado.ioloop
import tornado.web




class Root(tornado.web.RequestHandler):
    """ROOT"""

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header('Access-Control-Allow-Methods', 'GET')

    def get(self):
        """ROOT"""

        self.render("index.html")

 
def main():
    app = tornado.web.Application([
            ('/', Root)],
        template_path=os.path.join(os.path.dirname(__file__), "templates")
    )

    port = int(os.environ.get("PORT", 5000))

    app.listen(port)

    webbrowser.open('http://localhost:{}'.format(port))
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
