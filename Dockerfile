FROM node:11.4.0

RUN git clone https://github.com/Hiro-Nakamura/ab_service_notification_email.git app && cd app && yarn install

WORKDIR /app

CMD ["node", "--inspect", "app.js"]
