FROM node:12.1.0-alpine

LABEL maintainer="uakoB <uakob@ya.ru>"

ENV APP_DIR /server
ENV NPM_CONFIG_LOGLEVEL error

RUN mkdir -p ${APP_DIR}/app
WORKDIR ${APP_DIR}

RUN apk --update add git

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY test test

ENV APP_DIR /server

WORKDIR ${APP_DIR}

ENV TZ=Europe/Moscow
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && date

RUN ls -al ./test

CMD npm run test

