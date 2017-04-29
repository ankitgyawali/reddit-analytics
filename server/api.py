# Initialize http server and expose rest-api to do crud on database by using database-driver.py. Used by client side with D3 & Angular.js
# import sqlite3
import re, requests, sqlite3, logging, configparser, time
from flask import Flask, send_file, jsonify, json
import flask
import os


config = configparser.ConfigParser()
config.readfp(open(r'config.ini'))

sql = sqlite3.connect(config.get('DATABASE', 'DB_FILENAME'))
cur = sql.cursor()

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



@app.route('/initialize', methods=['POST'])
def initialize():
    
    data = cur.execute("SELECT * FROM thisWeek").fetchall()
    print(data)
    print(type(data))
    # return jsonify(data)
    # data = make_summary()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0')
