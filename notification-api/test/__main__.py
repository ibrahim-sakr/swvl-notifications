from flask_testing import TestCase
import unittest
import os
import sys
from dotenv import load_dotenv
import json

env_path = os.getcwd() + '/.env'
load_dotenv(dotenv_path=env_path, verbose=True, override=True)

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, '../modules'))

from app import app

class MyTest(TestCase):
    user = ''

    def create_app(self):
        app.config['DEBUG'] = False
        return app

    def test_app_working(self):
        response = self.client.get("/")
        self.assertEquals(response.json, dict(app='working'))

    def test_create_user(self):
        response = self.client.post("/users", data=json.dumps(dict(name='123', email='456')), content_type='application/json')
        self.__class__.user = response.json['user']
        self.assertStatus(response, 200)


    def test_list_users(self):
        response = self.client.get("/users")
        self.assertStatus(response, 200)


    def test_delete_user(self):
        response = self.client.delete("/users", data=json.dumps(dict(email=self.__class__.user['email'])), content_type='application/json')
        self.assertStatus(response, 200)


    def test_list_notifications(self):
        response = self.client.get("/notifications")
        self.assertStatus(response, 200)


if __name__ == '__main__':
    unittest.main()
