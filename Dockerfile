##
## digiserve/ab-notification-email:[master/develop]
##
## This is our microservice for managing sending/receiving of emails.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-notification-email:[master/develop] .
## $ docker push digiserve/ab-notification-email:[master/develop]
##

ARG BRANCH=master

FROM digiserve/service-cli:${BRANCH}

COPY . /app

WORKDIR /app

RUN npm i -f

CMD ["node", "--inspect=0.0.0.0:9229", "app.js"]
