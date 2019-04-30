import os
from flask import request, jsonify
from app import app, mongo
import logger
import datetime
import random
import string

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/users', methods=['GET'])
def usersIndex():
    data = list(mongo.db.users.find())
    return jsonify({'result': data}), 200

@app.route('/users', methods=['POST'])
def usersCreate():
    user = request.get_json()
    if user.get('name', None) is not None and user.get('email', None) is not None:
        now = datetime.datetime.now()
        user['token'] = randomString()
        user['created_at'] = now
        user['updated_at'] = now
        mongo.db.users.insert_one(user)
        return jsonify({'ok': True, 'message': 'User created successfully!', 'user': user}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

@app.route('/users', methods=['DELETE'])
def usersDelete():
    user = request.get_json()
    if user.get('email', None) is not None:
        db_response = mongo.db.users.delete_one({'email': user['email']})
        if db_response.deleted_count == 1:
            response = {'ok': True, 'message': 'record deleted'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

def randomString(stringLength=50):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

