import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask, jsonify, request, make_response, send_from_directory
from flask_pymongo import PyMongo

class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)

# create the flask object
app = Flask(__name__)

# add mongo url to flask config, so that flask_pymongo can use it to make connection
if app.config['DEBUG'] == True:
    MONGO_URI = 'mongodb://mongo:27017/swvl_notifications'
else:
    MONGO_URI = os.getenv("MONGO_URI")

app.config['MONGO_URI'] = MONGO_URI
mongo = PyMongo(app)

# use the modified encoder class to handle ObjectId & datetime object while jsonifying the response.
app.json_encoder = JSONEncoder

@app.errorhandler(404)
def not_found(error):
    """ error handler """
    return jsonify({'error': 'Not found'}), 404


@app.route('/', methods=['GET'])
def index():
    """ static files serve """
    return jsonify({'app': 'working'}), 200
    

from app.controllers import *
