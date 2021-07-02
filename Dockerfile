##
## digiserve/ab-notification-email:master
##
## This is our microservice for managing sending/receiving of emails.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-notification-email:master .
## $ docker push digiserve/ab-notification-email:master
##

FROM digiserve/service-cli:master

RUN git clone --recursive https://github.com/appdevdesigns/ab_service_notification_email.git app && cd app && npm install

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
