import { config } from 'dotenv';
// load env configs
config()

import { Consumer } from './process/consumer';
import { Processor } from './process/processor';
import { Database } from './db/database';

// connect to DB
const db = new Database();
db.connect();

// run the consumer to get the messages
const consumer = new Consumer();
consumer.connect();

// start listening for messages
consumer.on('message', Processor);
