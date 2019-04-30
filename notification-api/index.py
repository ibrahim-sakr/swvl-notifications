from dotenv import load_dotenv
import os
import sys

# load env vars
env_path = os.getcwd() + '/.env'
load_dotenv(dotenv_path=env_path, verbose=True, override=True)

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

from app import app

# Port variable to run the server on.
if app.config['DEBUG'] == True:
    PORT = 4000
else:
    PORT = os.getenv("APP_PORT")

if __name__ == '__main__':
    app.config['DEBUG'] = True # Debug mode if development env
    app.run(host='0.0.0.0', port=int(PORT))  # Run the app
