import os
from flask import request, jsonify, g
from app import app, mongo
import logger
import datetime
from flask_expects_json import expects_json
import pika

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

notification_schema = {
    'type': 'object',
    'properties': {
        'kind': {'type': 'string'},
        'providers': {'type': 'array'},
        'title': {'type': 'string'},
        'body': {'type': 'string'},
        'data': {'type': 'object' },
        'consumers': {'type': 'array'}
    },
    'required': ['kind', 'providers', 'title', 'body', 'consumers']
}

@app.route('/notifications', methods=['GET'])
def notificationsIndex():
    data = list(mongo.db.notifications.find())
    return jsonify({'result': data}), 200

@app.route('/notifications/send', methods=['POST'])
@expects_json(notification_schema)
def notificationsSend():
    # save into DB
    notification = g.data
    now = datetime.datetime.now()
    notification['created_at'] = now
    notification['updated_at'] = now
    mongo.db.notifications.insert_one(notification)

    # send to RabbitMQ
    msg='{"id": "' + str(notification['_id']) + '"}'
    connection = pika.BlockingConnection(pika.ConnectionParameters(os.getenv("RABBITMQ_HOST")))
    channel = connection.channel()
    channel.queue_declare(queue=os.getenv("RABBITMQ_QUEUE"))
    channel.basic_publish(exchange='', routing_key=os.getenv("RABBITMQ_QUEUE"), body=msg)
    print(" [x] Sent '" + str(notification['_id']) + "' to queue '" + os.getenv("RABBITMQ_QUEUE") + "'")
    connection.close()
    return jsonify({'ok': True, 'message': 'Notification created successfully!', 'notification': notification}), 200

