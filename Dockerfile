FROM node:13

RUN git clone https://github.com/Hiro-Nakamura/ab_service_notification_email.git app && cd app && npm install

WORKDIR /app

CMD ["node", "app.js"]
