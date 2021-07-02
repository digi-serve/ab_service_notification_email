##
## digiserve/ab-notification-email:develop
##
## This is our microservice for managing sending/receiving of emails.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-notification-email:develop .
## $ docker push digiserve/ab-notification-email:develop
##

FROM digiserve/service-cli:develop

RUN git clone --recursive https://github.com/appdevdesigns/ab_service_notification_email.git app && cd app && git checkout develop && npm install

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
