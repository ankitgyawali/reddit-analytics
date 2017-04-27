# Initialize http server and expose rest-api to do crud on database by using database-driver.py. Used by client side with D3 & Angular.js
# import sqlite3
import logging
import configparser
from flask import Flask, send_file
import flask
import os


template_dir = os.path.abspath('../client/build')
app = Flask(__name__, static_folder="../client/build",static_url_path='/client/build')

# app = Flask(__name__)
# app.config["APPLICATION_ROOT"] = "../client/build"


# @app.route("/")
# def index():
#     return send_file("index.html")

@app.route('/<path:path>')
def serve_page(path):
    return send_from_directory('../client/build', path)
	
if __name__ == "__main__":
    app.run(host='0.0.0.0')
