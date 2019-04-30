# swvl-notifications
swvl task for tech lead position

## contents
- [installation](#installation)
- [run tests](#run-tests)
- [usage](#usage)
- [available APIs](#available-apis)
- [full scenario](#full-scenario)
- [technical explanation](#technical-explanation)

## Installation
for the services to run smothly together,

just clone the repo then run `docker-compose up`

## Run Tests

## Usage

after the docker compose starts make sure you see on the console

`cli_1 | [*] Waiting for messages in notificationQueue.`

then you can send to `0.0.0.0:4000`

## Available APIs

- `GET    /users`
- `POST   /users`
- `DELETE /users`
- `GET    /notifications`
- `POST   /notifications/send`

## Full Scenario

this is the complete scenario as descriped in the task

- send notification to a user or set of users
- the notifications have multi types `SMS, Email, PushNotification`
- the number of notifications per minute is limited

so to complete this scenario we should follow these steps

- hit `GET /users` just to make sure the DB is empty
- hit `POST /users` to create a dummy user or multi users
- hit `GET /users` again to get list of users and grab their ids
- hit `GET /notifications` just to make sure the DB is empty
- hit `POST /notifications/send` to send a notification

User Data Example
```json
{
    "name": "dummy name",
    "email": "dummy email"
}
```
there is no need to go throw these properties since its just for demo porposes

Notification Data Example
```json
{
    "kind": "IN",
    "providers": ["sms", "fcm"],
    "title": "niti 3453536536",
    "body": "noti bbbb3453453453",
    "consumers": ["5cc80b47e9db456789836abe"],
    "data": {
        "key": "value"
    }
}
```
| property  	| type   	| values             	| explanation                                                                                                                                                                                                                      	|
|-----------	|--------	|--------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| kind      	| String 	| IN, TP             	| IN: if we need to send the notification to a specific user, TP: if we need to send the notification to group of users                                                                                                           	|
| providers 	| Array  	| SMS, EML, FCM, APN 	| which provider we need to use to send the notification                                                                                                                                                                           	|
| title     	| String 	| Empty              	| notification title                                                                                                                                                                                                               	|
| body      	| String 	| Empty              	| notification body                                                                                                                                                                                                                	|
| consumers 	| Array  	| Empty              	| if the kind is "IN" then this is array of user ids that we need to send the notification to, if the kind is "TP" then this is array of group names or topics that we need to send the notification to all users into these groups 	|
| data      	| Object 	| Empty              	| key, value of any additional data we need to send along with the notification                                                                                                                                                    	|

after the notification send you can see it in the console it will log everything

## Technical Explanation

take a look on this flow chart

![swvl_notifications](https://github.com/ibrahim-sakr/swvl-notifications/blob/master/assets/swvl_notification.png "swvl notification flowchart")

the code executes as folow

- when we send a request the docker deliver it to notification-api service which responsable for saving the data into MongoDB (users, notifications) then notify any third party services iin this case (notification-cli)

- when the notification-api send a notifier it uses RabbitMQ to notify notification-cli that there is a new notification that needs to be sent along with the notification id

- notification-cli receive the notification and start proccessing
    - select the notification (message) from DB
    - based on type create a new MessageTypeClass and pass the message
    - then into the MessageTypeClass we set the message
    - load all message providers
    - publish to them the message

notification Schema
- _id
- kind: String          // TP: topic, IN: individual
- providers: Array.     // SMS, FCM, APN, EML
- title: String
- body: String
- data: Object          // any additional data will be delivered with the message
- consumers: Array      // topics or user ids
- created_at: DateTime
- updated_at: DateTime
